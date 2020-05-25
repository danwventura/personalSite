const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { transport, makeANiceEmail } = require('../mail');
const { hasPermission } = require('../utils');
const stripe = require('../stripe');

const Mutations = {
    async createItem(parent, args, ctx, info) {
        if(!ctx.request.userId) {
            throw new Error('You must be logged in to do that!');
        }
        const item = await ctx.db.mutation.createItem({
            data: {
                // This is how to create a relationship between the item and the user
                user: {
                    connect: {
                        id: ctx.request.userId,
                    },
                },
                ...args,
            },
        }, info)
        return item;
    },
    updateItem(parent, args, ctx, info) {
        // first take a copy of the updates
        const updates = {...args};
        //remove the ID from the updates
        delete updates.id;
        //run the update method
        return ctx.db.mutation.updateItem({
            data: updates,
            where: {
                id: args.id
            }
        }, info
        );
    },
    async deleteItem(parent, args, ctx, info) {
        const where = {id: args.id};
        // find item
        const item = await ctx.db.query.item({ where }, `{id title user { id }}`)
        // check if they own that item
        //TO DO
        const ownsItem = item.user.id === ctx.request.userId;
        const hasPermissions = ctx.request.user.permissions.some(permission => ['ADMIN', 'ITEMDELETE'].includes(permission));
        if(!ownsItem || !hasPermissions) {
            throw new Error("You don't have permission to do that");
        }
        // delete
        return ctx.db.mutation.deleteItem({ where }, info)
    },
    async signup(parent, args, ctx, info) {
        args.email = args.email.toLowerCase();
        //hash their password
        const password = await bcrypt.hash(args.password, 10);
        //create the user in the database
        const user = await ctx.db.mutation.createUser({
            data: {
                ...args,
                password,
                permissions: { set:['USER'] }
            }
        }, 
        info
        );
        // create the jwt token for them
        const token = jwt.sign({ user: user.id }, process.env.APP_SECRET);
        // set the jwt as a cookie on the response
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 30,
        });
        // return the user to the browser
        return user;
    },
    async signin(parent, {email, password}, ctx, info) {
        // 1. check if there is a user with that email
        const user = await ctx.db.query.user({ where: {email} })
        if (!user){
            throw new Error(`No user found for email ${email}`);
        }
        // 2. check if their password is correct
        const valid = await bcrypt.compare(password, user.password);
        if(!valid) {
            throw new Error('Invalid Password');
        }
        // 3. generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
        // 4. set the cookie with the token
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 30,
        })
        // 5. return the user
        return user;
    },
    signout(parent, args, ctx, info) {
        ctx.response.clearCookie('token');
        return { message: 'Goodbye!' };
    },
    async requestReset(parent, args, ctx, info) {
        // 1. check if this is a real user
        const user = await ctx.db.query.user({ where: {email: args.email }});
        if (!user) {
            throw new Error(`No user found for email ${args.email}`);
        }
        // 2. set a reset token and expiry on that user
        const randomBytesPromiseified = promisify(randomBytes);
        const resetToken = (await randomBytesPromiseified(20)).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000; //1 hour from now
        const res = await ctx.db.mutation.updateUser({
            where: { email: args.email},
            data: { resetToken, resetTokenExpiry }
        });
        // 3. email them that reset token
        const mailRes = await transport.sendMail({
            from: 'systemadmin@stoneanddagger.com',
            to: user.email,
            subject: 'Your Password Reset Token for StoneAndDagger.com',
            html: makeANiceEmail(`You requested a password reset for your account at StoneAndDagger.com. 
                \n\n <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">Click Here to Reset</a>`)

        })
        // 4. return the message
        return { message: 'Thanks'}
    },
    async resetPassword(parent, args, ctx, info) {
        // 1. check if the passwords match
        if(args.password !== args.confirmPassword) {
            throw new Error ('Passwords do not match');
        }
        // 2. check if its a legit reset token
        // 3. check if its expired 
        const [ user ] = await ctx.db.query.users({
            where: {
                resetToken: args.resetToken,
                resetTokenExpiry_gte: Date.now() - 3600000,
            }
        });
        if(!user){
            throw new Error('This password reset link is invalid or expired');
        }
        // 4. hash their new password
        const password = await bcrypt.hash(args.password, 10);
        // 5. save the new password to the user and remove old reset token
        const updatedUser = await ctx.db.mutation.updateUser({
            where: { email: user.email },
            data: {
                password, 
                resetToken: null,
                resetTokenExpiry: null,
            },
        });
        // 6. generate JWT
        const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);
        // 7. set the JWT cookie
        ctx.response.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 30,
        });
        // 8. return the new user
        return updatedUser;
    },
    async updatePermissions(parent, args, ctx, info) {
        if(!ctx.request.userId) {
            throw new Error('You must be logged in!');
        }
        const currentUser = await ctx.db.query.user({
            where: {
                id: ctx.request.userId,
            }
        }, info
        );
        hasPermission(currentUser, ['ADMIN', 'PERMISSION']);
        return ctx.db.mutation.updateUser({
            data: {
                permissions: {
                    set: args.permissions
                }
            },
            where: {
                id: args.userId,
            },
        }, info)
    },
    async addToCart(parent, args, ctx, info) {
        const { userId } = ctx.request;
        //make sure they are signed in
        if(!ctx.request.userId) {
            throw new Error('You must be logged in!');
        }
        //query the users current cart
        const [existingCartItem] = await ctx.db.query.cartItems({
            where: {
                user: { id: userId },
                item: { id: args.id },
            },
        });
        //check if that item is already in their cart and increment by 1 if it is
        if (existingCartItem) {
            return ctx.db.mutation.updateCartItem({
                where:  { id: existingCartItem.id },
                data: { quantity: existingCartItem.quantity + 1},
                }, info
            );
        }
        //if its not, create a fresh cart item for the user
        return ctx.db.mutation.createCartItem({
            data: {
                user: {
                    connect: { id: userId },
                },
                item: {
                    connect: { id: args.id },
                },
            },
        }, info
        );
    },
    async removeFromCart(parent, args, ctx, info) {
        // find the cart item
        const cartItem = await ctx.db.query.cartItem({
            where: {
                id: args.id,

            }
        }, `{id, user { id }}`
        );
        if(!cartItem) throw new Error('No cart item found');
        if(cartItem.user.id !== ctx.request.userId) {
            throw new Error("Not Allowed");
        }
        return ctx.db.mutation.deleteCartItem({
            where: { id: args.id}
        }, info
        )
        //make sure they own that cart item
        //delete that cart item
    },
    async createOrder(parent, args, ctx, info) {
        // query the current user and make sure they are signed in
        const { userId } = ctx.request;
        if(!userId) throw new Error('You must be signed in to complete this order.');
        const user = await ctx.db.query.user(
            { where: { id: userId }},
            `{
                id
                name
                email
                cart {
                    id
                    quantity
                    item {
                        title
                        price
                        id
                        description
                        image
                    }
                }
            }`
        );
        // recalculate the total for the price
        const amount = user.cart.reduce((tally, cartItem) => tally + cartItem.item.price * cartItem.quantity, 0);
        console.log(`Going to charge for a total of ${amount}`);
        // create the stripe charge
        const charge = await stripe.charges.create({
            amount,
            currency: 'USD',
            source: args.token,
        })
        // convert cartitems to orderitems
        // create the order
        // clean up - clear the users cart, delete cartitems
        // return the order to the client
    }
};

module.exports = Mutations;

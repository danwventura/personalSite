const { forwardTo } = require('prisma-binding');
const { hasPermission } = require('../utils');

const Query = {
  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  me(parent, args, ctx, info) {
      // check if there is a current userId
      if (!ctx.request.userId) {
          return null;
      }
      return ctx.db.query.user({
          where: { id: ctx.request.userId },
      }, info)
  },
  async users(parent, args, ctx, info) {
      // 1. Check if they are logged in
      if (!ctx.request.userId) {
        throw new Error('You must be logged in!');
      }
      // console.log(ctx.request.userId);
      // 2. Check if the user has the permissions to query all the users
      hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);

      // 2. if they do, query all the users!
      return ctx.db.query.users({}, info);
  },
  async order(parent, args, ctx, info) {
    //make sure they are logged in
    if (!ctx.request.userId) {
      throw new Error('You arent logged in!');
    }
    //query the current order
    const order = await ctx.db.query.order(
      {
        where: { id: args.id },
      },
      info
    );
    //check if they have the permission to see this order
    console.log('order:', order);
    const ownsOrder = order.user.id === ctx.request.userId;
    const hasPermissionToSeeOrder = ctx.request.user.permissions.includes('ADMIN');
    if(!ownsOrder || !hasPermission){
      throw new Error('You dont have permission to view this order.');
    }
    //return the order
    return order;
  },
};

module.exports = Query;

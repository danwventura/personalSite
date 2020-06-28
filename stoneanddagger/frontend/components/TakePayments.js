import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import calcTotalPrice from '../lib/calcTotalPrice';
import Error from './ErrorMessage';
import User, { CURRENT_USER_QUERY } from './User';
import CartItem from './CartItem';

const CREATE_ORDER_MUTATION = gql`
    mutation createOrder($token: String!) {
        createOrder(token: $token){
            id
            charge
            total
            items{
                id
                title
            }
        }
    }
`;

const DECREMENT_ITEM_QUANTITY_MUTATION = gql`
    mutation decrementItemQuantity ( $id: ID!, $quantity: Int!){
        decrementItemQuantity(
            id: $id
            quantity: $quantity
        )
        {
            id
            quantity
        }
    }
`;

function totalItems(cart) {
    return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);
}

class TakePayments extends React.Component {
    onToken = async (res, createOrder, decrementItemQuantity, me) => {
        NProgress.start();
        //manually call the mutation once we have the stripe token
        const items = me.cart;
        const order = await createOrder({
            variables: {
                token: res.id,
            },
        }).catch(err => {
            alert(err.message);
        });
        for(let i = 0; i < items.length; i += 1) {
            let cartItem = items[i];
            const updatedItem = await decrementItemQuantity({
                variables: {
                    id: cartItem.item.id,
                    quantity: 0,
                }
            })
        }
        Router.push({
            pathname: '/order',
            query: { id: order.data.createOrder.id },
        })
    }
    render () {
        return (
            <User>
                {({ data: { me }}) => (
                    <Mutation mutation={CREATE_ORDER_MUTATION} refetchQueries={[{query: CURRENT_USER_QUERY}]}>
                        {(createOrder) => (
                        <Mutation mutation={DECREMENT_ITEM_QUANTITY_MUTATION}>
                            {(decrementItemQuantity) => (
                                <StripeCheckout
                                amount={calcTotalPrice(me.cart)}
                                name="Stone & Dagger"
                                description={`Order of ${totalItems(me.cart)} Items`}
                                image={me.cart.length && me.cart[0].item && me.cart[0].item.image}
                                stripeKey="pk_test_Sa39ds6fHrDwDZHe6tXVM2Zh00guorhS38"
                                currency="USD"
                                email={me.email}
                                // shippingAddress={true}
                                token={res => this.onToken(res, createOrder, decrementItemQuantity, me)}
                                >{ this.props.children }</StripeCheckout>
                                )}
                        </Mutation>
                        )}
                </Mutation>
                )}
            </User>
        )
    }
}

export default TakePayments;
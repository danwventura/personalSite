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

function totalItems(cart) {
    return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);
}

class TakePayments extends React.Component {
    render () {
        return (
            <User>
                {({ data: { me }}) => (
                    <StripeCheckout
                        amount={calcTotalPrice(me.cart)}
                        name="Stone & Dagger"
                        description={`Order of ${totalItems(me.cart)} Items`}
                        image={me.cart[0].item && me.cart[0].item.image}
                        // stripeKey=""
                        currency="USD"
                        email={me.email}
                        shippingAddress={true}

                    >{ this.props.children }</StripeCheckout>
                )}
            </User>
        )
    }
}

export default TakePayments;
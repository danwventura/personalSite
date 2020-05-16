import Link from 'next/link';
import { Mutation } from 'react-apollo';
import { TOGGLE_CART_MUTATION } from './Cart';
import styled from 'styled-components';
import NavStyles from './styles/NavStyles';
import User from './User';
import Signout from './Signout';
import CartCount from './CartCount';

const CartButton = styled.button`
    display: inline-block;
`;

const Nav = () => (
    <User>
        {({ data: { me } }) => (
            <NavStyles>
                <Link href="/items">
                    <a>Shop</a>
                </Link>
                <Link href="/about">
                    <a>About</a>
                </Link>
                {me && (
                    <>
                        {/* <Link href="/upload">
                            <a>Upload</a>
                        </Link> */}
                        <Link href="/customOrder">
                            <a>Custom Order</a>
                        </Link>
                        {/* <Link href="/orders">
                            <a>Orders</a>
                        </Link> */}
                        {/* <Link href="/me">
                            <a>Account</a>
                        </Link> */}
                        <Mutation mutation={ TOGGLE_CART_MUTATION }>
                            {(toggleCart) => (
                                <CartButton onClick={toggleCart}>My Cart<CartCount count={me.cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0)}></CartCount></CartButton>
                            )}
                        </Mutation>
                        <Signout />
                    </>
                )}
                {!me && (
                    <Link href="/signup">
                        <a>Sign In</a>
                    </Link>
                )}
            </NavStyles>
                )}
        </User>
        )
        
export default Nav;
        /* <Link href="/necklaces">
        <NavAnchor>Necklaces</NavAnchor>
        </Link>
        <Link href="/rings">
        <NavAnchor>Rings</NavAnchor>
        </Link>
        <Link href="/cuffs">
        <NavAnchor>Cuffs</NavAnchor>
    </Link> */
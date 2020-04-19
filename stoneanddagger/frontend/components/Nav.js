import Link from 'next/link';
import styled from 'styled-components';
import NavStyles from './styles/NavStyles';


const StyledNav = styled.ul`
    @font-face {
        font-family: 'WestGotisch';
        src: url('/static/WestminsterGotisch.ttf')
        format('woff');
    }
    font-size: 32px;

`;

const NavAnchor = styled.a`
    font-family: 'WestGotisch';
    color:white;
    justify-self: end;
`;


const Nav = () => (
    <NavStyles>
        <Link href="/upload">
            <NavAnchor>Upload</NavAnchor>
        </Link>
        <Link href="/">
            <NavAnchor>Shop</NavAnchor>
        </Link>
        <Link href="/about">
            <NavAnchor>About</NavAnchor>
        </Link>
        <Link href="/customOrder">
            <NavAnchor>Custom Order</NavAnchor>
        </Link>
        <Link href="/necklaces">
            <NavAnchor>Necklaces</NavAnchor>
        </Link>
        <Link href="/rings">
            <NavAnchor>Rings</NavAnchor>
        </Link>
        <Link href="/cuffs">
            <NavAnchor>Cuffs</NavAnchor>
        </Link>
    </NavStyles>
)

export default Nav;
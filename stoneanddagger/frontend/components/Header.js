import Link from 'next/link';
import NProgress from 'nprogress';
import styled from 'styled-components';
import Router from 'next/router';
import Nav from './Nav';
import Cart from './Cart';
// import StoneAndDaggerLogo from '../static/sndLogoWhiteRedGem.png';


Router.onRouteChangeStart = () => {
    NProgress.start();
}

Router.onRouteChangeComplete = () => {
    NProgress.done();
}

Router.onRouteChangeError = () => {
    NProgress.done();
}

const Logo = styled.h1`
    font-size: 4rem;
    margin-left: 2rem;
    position: relative;
    z-index: 2;
    transform: skew(-7deg);
    @font-face {
        font-family: 'Minster';
        src: url('/static/minster6.ttf')
        format('truetype');
        font-weight: normal;
        font-style: normal;
    }
    a{
        font-family: 'Minster';
        padding: 0.5rem 1rem;
        color: white;
        text-transform: uppercase;
        text-decoration: none;
    }
    @media(max-width: 1300px){
        margin: 0;
        text-align: center;
    }
`;

const StyledHeader = styled.header`
    .bar{
        margin-top: -27px;
        border-top: 1px  solid #A93B38;
        border-bottom: 2px  solid #A93B38;
        background-color: ${props => props.theme.black};
        display: grid;
        grid-template-columns: auto 1fr;
        justify-content: space-between;
        grid-template-columns: 1fr;
        
    }
    .sub-bar{
        text-align: center;
        display: grid;
        grid-template-columns: 1fr auto;
        border-bottom: 1px solid ${props => props.theme.lightgrey};
    }
    .logo{
        text-align:center;
        margin-top: -27px;
        background-color: ${props => props.theme.black};
        img{
            padding-top: 30px;
            height: 200px;
        }
    }
    /* .headerImage{
        background-image: url('/static/sndLogoWhiteRedGem.png');
    } */
`;

const Header = () => (
    <StyledHeader>
        <div className="logo">
            <Logo>
                <Link href="/">
                    <img src="/static/sndLogoWhiteRedGem.png"/>
                </Link>
            </Logo>
        </div>
        <div className="bar">
            <Nav />
        </div>
        <div className="sub-bar">
            {/* <p>Search</p> */}
        </div>
        <Cart/>
    </StyledHeader>
)

export default Header;
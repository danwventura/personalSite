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

// const Logo = styled.img`
//     margin-left: 2rem;
//     position: relative;
//     z-index: 2;
//     a{
//         padding: 0.5rem 1rem;
//         color: black;
//         text-transform: uppercase;
//         text-decoration: none;
//     }
//     img{
//         height: 125px;
//         padding-top: 3px;
//     }
//     @media(max-width: 1300px){
//         margin: 0;
//         text-align: center;  
//     }
// `;

const StyledHeader = styled.header`
    .bar{
        background-color: white;
        display: grid;
        grid-template-columns: auto 1fr;
        justify-content: space-between;
        grid-template-columns: 1fr;
        @media (max-width: 1300px) {
            grid-template-columns: 1fr;
            justify-content: center;
        }
        img{
            height: 150px;
            margin-top: 20px;
            margin-left: 20px;
        }
    }
    .sub-bar{
        display: grid;
        grid-template-columns: 1fr auto;
        border-bottom: 1px solid ${props => props.theme.lightgrey};
    }
`;

const Header = () => (
    <StyledHeader>
        <div className="bar">
            {/* <Logo>
                <Link href="/"> */}
                    <img src="/static/StoneAndDaggerLogo.png"/>
                {/* </Link>
            </Logo> */}
            <Nav />
        </div>
        <div className="sub-bar">
            {/* <p>Search</p> */}
        </div>
        <Cart/>
    </StyledHeader>
)

export default Header;
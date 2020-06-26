import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';


const FooterContainer = styled.div`
    margin-top: 200px;
    border-top: 1px solid #e7e7e7;
    color: #808080;
`;

const FooterContentContainer = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: space-between;
`;

const SpacerColumn = styled.div`
    width: 10%;
`;

const FooterTopColumn = styled.div`
    margin-top: 25px;
    width: 30%;
    text-align: center;
`;

const FooterColumnTextContainer = styled.div`
    width: 50%;
    p {
        font-size: .8em;
    }
    a {
        margin-right: 20px;
    }
`;

const FooterBottomContainer = styled.div`
    display: flex;
    margin-top: 100px;
`;

const FooterBottomColumn = styled.div`
    width: 30%;
    text-align: center;
    img {
        margin-right: 20px;
    }
`;

const FooterNavUl = styled.ul`
    a {
        display: block;
        text-align: center;
        color: #808080;
    }
`;


class Footer extends React.Component {
    render() {
        return (
            <FooterContainer>
                <FooterContentContainer>
                    <SpacerColumn />
                    <FooterTopColumn>
                        <FooterColumnTextContainer>
                            <h4>ABOUT THE SHOP</h4>
                            <p>Custom, hand-crafted jewelry that highlights the natural beauty and unique imperfections in each stone that make each piece one of a kind.</p>
                            <a href="#"><img src="/static/facebook32.png"/></a>
                            <a href="#"><img src="/static/instagram32.png"/></a>
                        </FooterColumnTextContainer>
                    </FooterTopColumn>
                    <FooterTopColumn>
                    </FooterTopColumn>
                    <FooterTopColumn>
                        <h4>SITE NAVIGATION</h4>
                        <FooterNavUl>
                            <Link href="/items">
                                <a>Shop</a>
                            </Link>
                            <Link href="/about">
                                <a>About</a>
                            </Link>
                            <Link href="/customOrder">
                                <a>Custom Order</a>
                            </Link>
                            <Link href="/orders">
                                <a>Orders</a>
                            </Link>
                        </FooterNavUl>
                    </FooterTopColumn>
                </FooterContentContainer>
                <FooterBottomContainer>
                    <FooterBottomColumn>
                        <p>	&#169; Stone & Dagger</p>
                    </FooterBottomColumn>
                    <FooterBottomColumn />
                    <SpacerColumn />
                    <FooterBottomColumn>
                        <img src="/static/visa.png"/>
                        <img src="/static/mastercard.png"/>
                        <img src="/static/amex.png"/>
                        <img src="/static/discover.png"/>
                    </FooterBottomColumn>
                </FooterBottomContainer>
            </FooterContainer>
        )
    }
}

export default Footer;
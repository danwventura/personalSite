import React, { Component } from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Error from './ErrorMessage';
import styled from 'styled-components';
import Head from 'next/head';
import HorizontalCarousel from './HorizontalCarousel';
import Card from './CarouselCard';
import formatMoney from '../lib/formatMoney';




const SingleItemStyles = styled.div`
    text-align: center;
    max-width: 1200px;
    /* margin: 4rem 3rem; */
    box-shadow: ${props => props.theme.bs};
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    min-height: 700px;
    .details{
        display: inline-block;
        font-size: 1.75rem;
        max-width: 60%;
        margin-bottom: 50px;
        text-align: center;
    }
    h2{
        padding-top: 2rem;
    }
`;

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY($id: ID!) {
        item(where: { id: $id}) {
            id
            title
            description
            largeImage
            price
            image
            image2
            image3
            image4
        }
    }
`;


class SingleItem extends Component {
    render() {
        return (
        <Query query={SINGLE_ITEM_QUERY} variables={{
            id: this.props.id,
        }}>
            {({error, loading, data}) => {
                if(error) return <Error error={error}/>
                if(loading) return <p>Loading...</p>
            if(!data.item) return <p>No Item Found for: {this.props.id}</p>
            const item = data.item;
                return (
                <SingleItemStyles>
                    <Head>
                        <title>Stone and Dagger | {item.title}</title>
                    </Head>
                    <h1>{item.title}</h1>
                    {/* <img src={item.image} alt={item.title}/> */}
                    <HorizontalCarousel>
                        <Card card_number={item.image}/>
                        <Card card_number={item.image2}/>
                        <Card card_number={item.image3}/>
                        <Card card_number={item.image4}/>
                    </HorizontalCarousel>
                    <div className="details">
                        <p>{item.description}</p>
                        <h5>{formatMoney(item.price)}.00</h5>
                    </div>
                </SingleItemStyles>
                )
            }}  
        </Query>    
        )
    }
}

export default SingleItem;
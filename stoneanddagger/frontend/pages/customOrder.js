import React from 'react';
import styled from 'styled-components';
import SickButton from '../components/styles/SickButton';


const OrderButton = styled.h1`
    @font-face {
        font-family: 'FancyCardText';
        src: url('/static/FancyCardText.ttf')
        format('truetype');
        font-weight: normal;
        font-style: normal;
    }
    font-family: 'FancyCardText';
    border-radius: 8px;
`;


const OrderDiv = styled.div`
    @font-face {
        font-family: 'Century Gothic';
        src: url('/static/CenturyGothic.ttf')
        format('truetype');
        font-weight: normal;
        font-style: normal;
    }
    text-align: center;
    input {
        font-family: 'Century Gothic';
        height: 35px;
        padding:10px;
        border:0;
        border-radius: 6px;
        box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
        margin-bottom: 20px;
    }
    textarea {
        font-family: 'Century Gothic';
        margin-top: 30px;
        margin-bottom: 30px;
        padding:10px;
        border:0;
        border-radius: 6px;
        box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
    }
    select {
        font-family: 'Century Gothic';
        height: 50px;
        padding:10px;
        border:0;
        border-radius: 6px;
        box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
        margin-bottom: 20px;
    }
`;


const customOrder = props => (
    <OrderDiv>
        <h3>Custom Order</h3>
        <div>
            <input type="text" id="name" name="name" placeholder="Full Name"/>
        </div>
        <div>
            <input type="text" id="phone" name="phone" placeholder="Phone"/>
        </div>
        <div>
            <input type="email" id="email" name="email" placeholder="Email"/>
        </div>
        <div>
            <select>
                <option disabled selected>Ring Size</option>
                <option>3</option>
                <option>3.5</option>
                <option>4</option>
                <option>4.5</option>
                <option>5</option>
                <option>5.5</option>
                <option>6</option>
                <option>6.5</option>
                <option>7</option>
                <option>7.5</option>
                <option>8</option>
                <option>8.5</option>
                <option>9</option>
                <option>9.5</option>
                <option>10</option>
                <option>10.5</option>
                <option>11</option>
                <option>11.5</option>
                <option>12</option>
                <option>12.5</option>
                <option>13</option>
                <option>13.5</option>
            </select>
        </div>
        <div>
            <textarea name="message" id="message" placeholder="Message" cols="30" rows="8"></textarea>
        </div>
        {/* <div>
            <button type="submit" value="Send Message" class="btn btn-primary text-white font-weight-bold">SEND</button>
        </div> */}
        <SickButton>Send</SickButton>
    </OrderDiv>
)

export default customOrder;
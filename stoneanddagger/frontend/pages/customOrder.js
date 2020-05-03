import React from 'react';
import styled from 'styled-components';

const OrderDiv = styled.div`
    text-align: center;
`;

const customOrder = props => (
    <OrderDiv>
        <div class="col-md-6 form-group">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" class="form-control "/>
        </div>
        <div class="col-md-6 form-group">
            <label for="phone">Phone</label>
            <input type="text" id="phone" name="phone" class="form-control "/>
        </div>
        <div class="col-md-12 form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" class="form-control "/>
        </div>
        <div class="col-md-12 form-group">
            <label for="message">Message</label>
            <textarea name="message" id="message" class="form-control " cols="30" rows="8"></textarea>
        </div>
        <div class="col-md-6 form-group">
            <input type="submit" value="Send Message" class="btn btn-primary text-white font-weight-bold"/>
        </div>
    </OrderDiv>
)

export default customOrder;
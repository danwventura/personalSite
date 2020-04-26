import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const REQUEST_RESET_MUTATION = gql`
    mutation REQUEST_RESET_MUTATION($email: String!){
        requestReset(email: $email) {
            message
        }
    }
`;

class RequestReset extends Component {
    state = {
        email: '',
    }
    saveToState = e => {
        this.setState({ [e.target.name]: e.target.value});
    }
    render() {
        return (
            <Mutation mutation={REQUEST_RESET_MUTATION} variables={this.state}>
                {(reset, {error, loading, called}) => ( 
                <Form method="post" onSubmit={ async e => { 
                    e.preventDefault();
                    //validation for success/fail to add user here
                   const response = await reset();
                   this.setState({name: '', email: '', password: ''})
                }}>
                    <fieldset disabled={loading} aria-busy={loading}>
                        <h2>Request Password Reset</h2>
                        <Error error={error}/>
                        {!error && !loading && called && <p>If there is an account with this email check your inbox for reset link.</p>}
                        <label htmlFor="email">
                            Email
                            <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.saveToState}></input>
                        </label>
                        <button type="submit">Request Reset</button>
                    </fieldset>
                </Form>) }
            </Mutation>
        )
    }
}

export default RequestReset;
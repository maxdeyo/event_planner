import React, {Component} from 'react';
import {Segment, Grid, Button, Header, Form, Input, TextArea, Message} from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

import NavBar from '../components/NavBar.js';

const axios = require('axios');

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: false,
            toHome: false,
            account: {
                username: null,
                password: null
            },
            toSignUp: false,
            errorMessage: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInputChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({account: {...this.state.account, [name]: value}})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        //pass up account to top level
        //navigate back to home
        let databody = this.state.account;
        const headers = { 'Content-Type': 'application/json' };
        axios.post('/api/login', databody, { headers })
            .then((res)=>{
                this.setState({errorMessage: JSON.stringify(res.data)})
                this.setState({isSignedIn: res.data.success});
                if(res.data.success!=true){
                    this.setState({errorMessage: 'Log In Failed'});
                } else {
                    this.setState({errorMessage: ''});
                }
            });
    }
    render() {
        if (this.state.isSignedIn === true || this.state.toHome) {
            return <Redirect to='/' />
        }
        if (this.state.toSignUp === true) {
            return <Redirect to='/signup' />
        }
        return (
            <div className="app">
                <Segment inverted color='black' size='huge' className='add-an-event-segment'>
                    <Header as='h1' style={{ position: 'relative', width: '100%', top: '20px' }}
                    textAlign='center'>Log In</Header>
                    <Button inverted onClick={()=>this.setState({toHome: true})}>Home</Button>
                    <Button inverted onClick={()=>this.setState({toSignUp: true})}>Sign Up</Button>
                </Segment>
                <Form size='huge'>
                    <Form.Field required
                                class='form-description-class'
                                control={Input}
                                label='Username'
                                placeholder='Username'
                                name='username'
                                onChange={this.handleInputChange}
                    />
                    <Form.Field required
                                class='form-description-class'
                                control={Input}
                                label='Password'
                                placeholder='Password'
                                name='password'
                                type='password'
                                onChange={this.handleInputChange}
                    />
                    <Form.Button
                        id='form-button-control-public'
                        content='Sign In'
                        type='submit'
                        color='blue'
                        style={{ position: 'relative', width: '100%', padding: '15px' }}
                        disabled={!this.state.account.username
                        || !this.state.account.password
                        }
                        onClick={this.handleSubmit}
                    />
                </Form>
            </div>
        );
    }
}

export default Login;
import React, {Component} from 'react';
import {Segment, Grid, Button, Header, Form, Input, TextArea, Message} from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

import NavBar from '../components/NavBar.js';

const axios = require('axios');

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: false,
            toLogin: false,
            account: {
                username: null,
                password: null
            },
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
        axios.post('/api/signup', databody, { headers })
            .then((res)=>{
                this.setState({errorMessage: JSON.stringify(res)})
                this.setState({isSignedIn: res.data.success});
                if(res.data.success&&res.data.success==true){
                    this.setState({errorMessage: '', toLogin: true});
                }
            })
            .then(()=>this.setState({toLogin: true}));
    }
    render() {
        if (this.state.isSignedIn === true) {
            return <Redirect to='/' />
        }
        if (this.state.toLogin === true) {
            return <Redirect to='/login' />
        }
        return (
            <div className="app">
                <Segment inverted color='black' size='huge' className='add-an-event-segment'>
                    <Header as='h1' textAlign='center'>Sign Up</Header>
                    <Header as='h2'>{this.state.errorMessage}</Header>
                    <Button
                        onClick={()=>this.setState({toLogin: true})}
                        primary
                    >Log In</Button>
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
                        content='Create User'
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

export default Signup;
import React, {Component} from 'react';
import {Segment, Grid, Button, Header, Form, Input, TextArea, Message} from 'semantic-ui-react';
import {Redirect} from 'react-router-dom';

import NavBar from '../components/NavBar.js';

const axios = require('axios');

/*
UserName Regex:
Only contains alphanumeric characters, underscore and dot.
Underscore and dot can't be at the end or start of a username (e.g _username / username_ / .username / username.).
Underscore and dot can't be next to each other (e.g user_.name).
Underscore or dot can't be used multiple times in a row (e.g user__name / user..name).
Number of characters must be between 8 to 20.
 */
const userNameRegex = RegExp('^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$');
//Must be 6 to 15 characters, include at least one lowercase letter, one uppercase letter and at least one number. It should also contain no spaces.
const passwordRegex = RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)\\S{6,15}$');

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: false,
            toLogin: false,
            toHome: false,
            account: {
                username: null,
                password: null
            },
            usernameErr: 'Usernames must be at least 8 characters long and only contain alphanumeric characters, underscore and dot.',
            passwordErr: 'Password must be 6 to 15 characters, include at least one lowercase letter, one uppercase letter and at least one number. It should also contain no spaces.',
            errorMessage: {
                username: false,
                password: false
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isValidUsername = this.isValidUsername.bind(this);
        this.isValidPassword = this.isValidPassword.bind(this);
    }

    handleInputChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({account: {...this.state.account, [name]: value}});
        if (name == 'username') {
            this.isValidUsername();
        }
        if (name == 'password') {
            this.isValidPassword();
        }
    }

    isValidUsername() {
        if (userNameRegex.test(this.state.account.username)) {
            this.setState({
                errorMessage: {
                    ...this.state.errorMessage,
                    username: false
                }
            });
        } else {
            this.setState({
                errorMessage: {
                    ...this.state.errorMessage,
                    username: true
                }
            });
        }
    }

    isValidPassword() {
        if (passwordRegex.test(this.state.account.password)) {
            this.setState({
                errorMessage: {
                    ...this.state.errorMessage,
                    password: false
                }
            });
        } else {
            this.setState({
                errorMessage: {
                    ...this.state.errorMessage,
                    password: true
                }
            });
        }
    }

    handleSubmit = async (e) => {
        if (this.state.errorMessage.username == false && this.state.errorMessage.password == false) {
            e.preventDefault();
            //pass up account to top level
            //navigate back to home
            let databody = this.state.account;
            const headers = {'Content-Type': 'application/json'};
            await axios.post('/api/signup', databody, {headers});
            await axios.post('/api/login', databody, {headers})
                .then((res) => {
                    this.setState({isSignedIn: res.data.success});
                    if (res.data.success != true) {
                        this.setState({errorMessage: 'Log In Failed'});
                    } else {
                        this.setState({errorMessage: ''});
                    }
                });
        }
    }

    render() {
        if (this.state.isSignedIn === true || this.state.toHome) {
            return <Redirect to='/'/>
        }
        if (this.state.toLogin === true) {
            return <Redirect to='/login'/>
        }
        return (
            <div className="app">
                <Segment inverted color='black' size='huge' className='add-an-event-segment'>
                    <Header as='h1' textAlign='center' style={{ position: 'relative', width: '100%', top: '20px' }}>Sign Up</Header>
                    <Button
                        onClick={() => this.setState({toHome: true})}
                        inverted
                    >Home</Button>
                    <Button
                        onClick={() => this.setState({toLogin: true})}
                        inverted
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
                    {
                        this.state.errorMessage.username ?
                            <Message negative>
                                {this.state.usernameErr}
                            </Message>
                            : <div/>
                    }
                    {
                        this.state.errorMessage.password ?
                            <Message negative>
                                {this.state.passwordErr}
                            </Message>
                            : <div/>
                    }
                    <Form.Button
                        id='form-button-control-public'
                        content='Create User'
                        type='submit'
                        color='blue'
                        style={{position: 'relative', width: '100%', padding: '15px'}}
                        disabled={!this.state.account.username
                        || !this.state.account.password
                        || this.state.errorMessage.username
                        || this.state.errorMessage.password
                        }
                        onClick={this.handleSubmit}
                    />

                </Form>
            </div>
        );
    }
}

export default Signup;
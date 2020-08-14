import React, {Component} from 'react';
import {Segment, Grid, Button, Header} from 'semantic-ui-react'
import {NavLink} from 'react-router-dom';
import NavBar from '../components/NavBar.js';
import EventCard from '../components/EventCard.js'
import * as toIcsFile from '../data/toIcsFile';
import {Redirect} from "react-router-dom";

const FileSaver = require('file-saver');

const axios = require('axios');

class MyEvents extends Component {
    // Initialize state
    constructor(props) {
        super(props);
        this.state = {
            events: null,
            user: null,
            isSignedIn: false,
            refresh: false
        }
        this.deleteEvent = this.deleteEvent.bind(this);
        this.downloadAllEvents = this.downloadAllEvents.bind(this);
    }

    // Fetch data after first mount
    async componentDidMount() {
        await this.getData();
    }

    getData = async () => {
        // Get the data and store them in state
        await fetch('/api/currentuser')
            .then(res => res.json())
            .then(user => {
                this.setState({user: user, isSignedIn: true});
            }).catch(error => console.log(error));
        if (this.state.isSignedIn) {
            await fetch('/api/events/all/' + this.state.user.username.toString())
                .then(res => res.json())
                .then(events => this.setState({events: events}))
                .catch(error => console.error(error));
        }

        //Use this if you want to show all events by all users
        /*else {
            await fetch('/api/events/all')
                .then(res => res.json())
                .then(events => this.setState({events: events}))
                .catch(error => console.error(error));
        }*/


    }

    async deleteEvent(id) {
        // Issue DELETE request
        await axios.delete(`/api/events/delete/${id}`)
            .then(() => {
                this.getData();
            })
            .catch(err => console.log(err));
        this.setState({refresh: true});
    }

    downloadAllEvents() {
        let blob = new Blob([toIcsFile.icsAllEvents(this.state.events)], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, "MyEvents" + ".ics");
    }

    render() {
        if (this.state.refresh === true) {
            return <Redirect to='/'/>
        }
        return (
            <div className="App">
                {/* Render the data if we have it */}
                <div>
                    <NavBar/>
                    <Segment inverted color='black' size='huge' className='add-an-event-segment'>
                        <Header as='h1' textAlign='center'> My Events </Header>
                        <Button primary onClick={this.downloadAllEvents}>Download All</Button>
                    </Segment>
                    {
                        this.state.isSignedIn ?
                            <div>
                                <Grid columns='equal'>
                                    <Grid.Column>
                                        Event
                                    </Grid.Column>
                                    <Grid.Column>
                                        Description
                                    </Grid.Column>
                                    <Grid.Column>
                                        Start Time
                                    </Grid.Column>
                                    <Grid.Column>
                                        End Time
                                    </Grid.Column>
                                    <Grid.Column>
                                    </Grid.Column>
                                </Grid>
                                <Segment.Group>
                                    {
                                        this.state.events !== null && this.state.events.length > 0 ?
                                            this.state.events.map((event, index) => {
                                                return (
                                                    <Segment secondary={index % 2 === 0 ? true : false}>
                                                        <EventCard event={event}
                                                                   deleteEvent={() => this.deleteEvent(event._id)}/>
                                                    </Segment>
                                                )
                                            }) :
                                            <Segment>
                                                <Header as='h4' textAlign='center'>No Events</Header>
                                            </Segment>
                                    }
                                </Segment.Group>
                            </div>
                            :
                            <Segment>
                                <Header as='h4' textAlign='center'>Sign In to Save and See Events!</Header>
                                <Button primary
                                        as={NavLink}
                                        exact to="/signup"
                                        name="Sign Up"
                                        onClick={this.handleItemClick}
                                >
                                    Sign Up
                                </Button>
                                <Button primary
                                        as={NavLink}
                                        exact to="/login"
                                        name="Log In"
                                        onClick={this.handleItemClick}
                                >
                                    Log In
                                </Button>
                            </Segment>
                    }
                </div>
            </div>
        );
    }
}

export default MyEvents;
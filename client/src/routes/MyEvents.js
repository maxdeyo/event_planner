import React, { Component } from 'react';
import { Segment, Grid, Button, Header } from 'semantic-ui-react'
import NavBar from '../components/NavBar.js';
import EventCard from '../components/EventCard.js'

const axios = require('axios');

class MyEvents extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      events: null
    }
    this.deleteEvent = this.deleteEvent.bind(this);
  }

  // Fetch data after first mount
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    // Get the data and store them in state
    fetch('/api/events/all')
      .then(res => res.json())
      .then(events => this.setState({ events: events }));
  }
  getFile = () => {
    fetch('/files/myfile.ics');
  }

  deleteEvent(id){
      // Issue DELETE request
      axios.delete(`/api/events/delete/${id}`)
        .then(() => {
            // Issue GET request after item deleted to get updated list
            // that excludes user of id
            return axios.get(`/api/events/all`)
        })
        .then(res => {
            // Update events in state as per-usual
            const events = res.data;
            this.setState({ events });
      })
  }

  render() {

    return (
      <div className="App">
        {/* Render the data if we have it */}
            <div>
            <NavBar />
            <Segment inverted color='black' size='huge' className='add-an-event-segment'>
                <Header as='h1' textAlign='center'> My Events </Header>
                <Button primary>Download All</Button>
            </Segment>
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
               this.state.events!==null ? 
                this.state.events.map((event, index)=>{
                  return (
                    <Segment secondary={index%2===0 ? true : false}>
                      <EventCard event={event}/>
                    </Segment>
                  )
                }) : 
                <Segment>
                    <Header as='h4' textAlign='center'>No Events</Header>
                </Segment>
             }
             </Segment.Group>
          </div>
      </div>
    );
  }
}

export default MyEvents;
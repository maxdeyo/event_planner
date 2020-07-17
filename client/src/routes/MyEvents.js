import React, { Component } from 'react';
import { Segment, Grid, Button, Header } from 'semantic-ui-react'
import NavBar from '../components/NavBar.js';
import EventCard from '../components/EventCard.js'

class MyEvents extends Component {-
  // Initialize state
  state = { test: 'null' }

  // Fetch data after first mount
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    // Get the data and store them in state
    fetch('/api/test')
      .then(res => res.json())
      .then(test => this.setState({ test }));
  }
  getFile = () => {
    fetch('/files/myfile.ics');
  }

  render() {
    const { test } = this.state;

    return (
      <div className="App">
        {/* Render the data if we have it */}
        {test!=null ? (
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
              <Segment secondary>
              <EventCard />
              </Segment>
             <Segment>
              <EventCard />
             </Segment>
             <Segment secondary>
              <EventCard />
             </Segment>
             </Segment.Group>
          </div>
        ) : (
          // Render a helpful message otherwise
          <div>
            <h1>No data :(</h1>
          </div>
        )}
      </div>
    );
  }
}

export default MyEvents;
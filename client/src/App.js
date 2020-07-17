import React, { Component } from 'react';
import { Form, Input, TextArea, Segment, Button, Header } from 'semantic-ui-react'
import Calendar from './components/Calendar.js';
import NavBar from './components/NavBar.js';
import './App.css';

class App extends Component {-
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
                <Header as='h1' textAlign='center'> Add an Event </Header>
            </Segment>
              <div class='form'>
              <Form size='huge'>
                <Form.Field
                  id='form-textarea-control-event'
                  control={Input}
                  label='Event Title'
                  placeholder='Event Title'
                />
                <div class="calendar">

                <Calendar />

                  </div>
                <Form.Field
                  class='form-description-class'
                  id='form-description'
                  control={TextArea}
                  label='Description'
                  placeholder='Description'
                />
                <Form.Field
                  id='form-input-control-error-location'
                  control={TextArea}
                  label='Location'
                  placeholder='Location'
                />
                <Form.Field
                  id='form-button-control-public'
                  control={Button}
                  content='Create Event'
                  label=''
                />
              </Form>
          </div>
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

export default App;
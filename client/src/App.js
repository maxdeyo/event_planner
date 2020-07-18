import React, { Component } from 'react';
import { Form, Input, TextArea, Segment, Button, Header } from 'semantic-ui-react'
import Calendar from './components/Calendar.js';
import NavBar from './components/NavBar.js';
import './App.css';

const axios = require('axios')

class App extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      event: {
        name: '',
        description: '',
        location: '',
        dtstart: '',
        dtend: '',
        summary: ''
      }
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInputChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({event: {...this.state.event, [name]: value}})
  }

  handleStartChange = startDate => {
    this.setState({event: {...this.state.event, dtstart: startDate}})
  };
  handleEndChange = endDate => {
    this.setState({event: {...this.state.event, dtend: endDate}})
  };
  handleSubmit = (e) =>{
    e.preventDefault();

    let databody = this.state.event;

    const headers = { 'Content-Type': 'application/json' };

    axios.post('/api/events/save', databody, { headers });

 }

  render() {
    return (
      <div className="App">
        {/* Render the data if we have it */}
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
                  name='name'
                  onChange={this.handleInputChange}
                />
                <div class="calendar">

                <Calendar 
                  handleStartChange={this.handleStartChange}
                  handleEndChange={this.handleEndChange}
                />

                  </div>
                <Form.Field
                  class='form-description-class'
                  id='form-description'
                  control={TextArea}
                  label='Description'
                  placeholder='Description'
                  name='description'
                  onChange={this.handleInputChange}
                />
                <Form.Field
                  id='form-input-control-error-location'
                  control={TextArea}
                  label='Location'
                  placeholder='Location'
                  name='location'
                  onChange={this.handleInputChange}
                />
                <Button
                  id='form-button-control-public'
                  content='Create Event'
                  type='submit'
                  onClick={this.handleSubmit}
                />
              </Form>
          </div>
          </div>
      </div>
    );
  }
}

export default App;
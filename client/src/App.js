import React, { Component } from 'react';
import { Form, Input, TextArea, Message, Segment, Button, Header } from 'semantic-ui-react'
import Calendar from './components/Calendar.js';
import NavBar from './components/NavBar.js';
import Autocomplete from './components/Autocomplete.js'
import './App.css';
/* global google */

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
        summary: '',
        nameError: false,
        descriptionError: false,
        formError: false
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
    let error = false;
    if (this.state.event.name.length < 25) {
        this.setState({ nameError: true });
        error = true;
        } else {
        this.setState({ nameError: false });
        }
    if (this.state.event.description.length < 100) {
        this.setState({ descriptionError: true });
        error = true;
        } else {
        this.setState({ descriptionError: false });
        }
    if (error) {
        this.setState({ formError: true });
        return; // prevent handleSubmit from executing
    }

    this.setState({ formError: false });

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
              <Form
                onSubmit={(event) => {this.handleSubmit(event);}}
                error={this.state.formError}
                size='huge'>
                {this.state.formError
                ?
                <Message
                error
                header="Dwad"
                content="AWD"/> : null}

                <Form.Field required
                  id='form-textarea-control-event'
                  control={Input}
                  label='Event Title'
                  placeholder='Event Title (25 characters max)'
                  name='name'
                  onChange={this.handleInputChange}
                  error={this.state.nameError}
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
                  placeholder='Description (100 characters max)'
                  name='description'
                  onChange={this.handleInputChange}
                  error={this.state.descriptionError}
                />
                <Autocomplete />
                <Form.Button
                  id='form-button-control-public'
                  content='Create Event'
                  type='submit'
                  color='blue'
                  disabled={!this.state.event.name
                  || !this.state.event.dtstart
                  || !this.state.event.dtend
                  }
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
import React, { Component } from 'react';
import { Form, Input, TextArea, Message, Segment, Button, Header } from 'semantic-ui-react'
import Calendar from './components/Calendar.js';
import NavBar from './components/NavBar.js';
import Autocomplete from './components/Autocomplete.js';
import  RecurrenceModal from './components/RecurrenceModal.js'
import  ExtraOptionsModal from './components/ExtraOptionsModal.js'
import './App.css';
import {Redirect} from "react-router-dom";

import * as toIcsFile from './data/toIcsFile';
const FileSaver = require('file-saver');
const axios = require('axios')

class App extends Component {
  // Initialize state
  constructor(props) {
    super(props);
    this.state = {
      event: {
        name: '',
        description: '',
        location: '',
        dtstart: '',
        dtend: '',
        summary: '',
        recurrence: '',
        tzid: '',
        priority: '',
        resources: ''
      },
      isSignedIn: false,
      user: null,
      redirect: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.handlePriorityChange = this.handlePriorityChange.bind(this);
    this.handleTimeZoneChange = this.handleTimeZoneChange.bind(this);
    this.handleResourceChange = this.handleResourceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSaveFile = this.onSaveFile.bind(this);
  }

  componentDidMount(){
    this.setCurrentUser();
  }

  onSaveFile() {
    let blob = new Blob([toIcsFile.icsText(this.state.event)], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, this.state.event.name + ".ics");
  }

  setCurrentUser(){
    fetch('/api/currentuser')
        .then(res => res.json())
        .then(user => {
          if(user.username) {
            this.setState({user: user, isSignedIn: true});
          } else {
            this.setState({user: null, isSignedIn: false});
          }
        })
        .catch( error => console.log(error));
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

  handlePriorityChange = extraPriority => {
    this.setState({event: {...this.state.event, priority: extraPriority}})
  };

  handleResourceChange = extraResources => {
    this.setState({event: {...this.state.event, resources: extraResources}})
  };
  handleTimeZoneChange = extraTzid => {
    this.setState({event: {...this.state.event, tzid: extraTzid}})
  }

  handleSubmit = (e) =>{
    e.preventDefault();
    let databody = this.state.user.username ? {...this.state.event, username: this.state.user.username} : this.state.event;
    const headers = { 'Content-Type': 'application/json' };
    axios.post('/api/events/save', databody, { headers });
    this.setState({redirect: true});
 }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to='/myevents' />
    }
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
                <Form.Field required
                  id='form-textarea-control-event'
                  control={Input}
                  label='Event Title'
                  placeholder='Event Title (25 characters max)'
                  name='name'
                  onChange={this.handleInputChange}
                />
                <div class="calendar">
                <Calendar 
                  handleStartChange={this.handleStartChange}
                  handleEndChange={this.handleEndChange}
                />
                  </div>
                 <RecurrenceModal
                   onChange={this.handleInputChange}/>
                <Form.Field
                  class='form-description-class'
                  id='form-description'
                  control={TextArea}
                  label='Description'
                  placeholder='Description (100 characters max)'
                  name='description'
                  onChange={this.handleInputChange}
                />
                <Autocomplete />
                <ExtraOptionsModal
                   handlePriorityChange={this.handlePriorityChange}
                   handleResourceChange={this.handleResourceChange}
                   handleTimeZoneChange={this.handleTimeZoneChange}
                 />
                <Form.Button
                  id='form-button-control-public'
                  content='Create Event'
                  type='submit'
                  color='blue'
                  style={{ position: 'relative', width: '100%', padding: '15px', top: '-80px' }}
                  disabled={!this.state.event.name
                  || !this.state.event.dtstart
                  || !this.state.event.dtend
                  || !this.state.isSignedIn
                  }
                  onClick={this.handleSubmit}
                />
                <Form.Button
                    id='form-button-control-public'
                    content='Download Event'
                    type='submit'
                    color='black'
                    style={{ position: 'relative', width: '100%', padding: '15px', top: '-80px' }}
                    disabled={!this.state.event.name
                    || !this.state.event.dtstart
                    || !this.state.event.dtend
                    }
                    onClick={this.onSaveFile}
                />
              </Form>
          </div>
          </div>
      </div>
    );
  }
}

export default App;
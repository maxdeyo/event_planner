import React, { Component } from 'react';
import { Form, Input, Modal, TextArea, Message, Segment, Button, Header } from 'semantic-ui-react'
import TimeZones from './data/timezones.js';
import Calendar from './components/Calendar.js';
import NavBar from './components/NavBar.js';
import  RecurrenceModal from './components/RecurrenceModal.js'
import  ExtraOptionsModal from './components/ExtraOptionsModal.js'
import './App.css';
import {Redirect} from "react-router-dom";

import * as toIcsFile from './data/toIcsFile';
const FileSaver = require('file-saver');
const axios = require('axios')
/* global google */

class App extends Component {
  // Initialize state
  constructor(props) {
    super(props);
    this.state = {
        open: false,
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
   // this.handleLocationChange= this.handleLocationChange.bind(this);
    this.handleLocationSelect = this.handleLocationSelect.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSaveFile = this.onSaveFile.bind(this);
    this.setResourceData = this.setResourceData.bind(this);
    this.setPriorityData = this.setPriorityData.bind(this);
    this.handleTzidChange = this.handleTzidChange.bind(this);
    this.autocomplete = null;
  }

  componentDidMount() {
    this.setCurrentUser();
    this.autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), {})
    this.autocomplete.addListener("place_changed", this.handleLocationSelect)

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

    handleLocationSelect = e => {
      let addressObject = this.autocomplete.getPlace();
      let address = addressObject.address_components
      this.setState({event: {...this.state.event, location: addressObject.formatted_address }})
    };

  handleStartChange = startDate => {
    this.setState({event: {...this.state.event, dtstart: startDate}})
  };

  handleEndChange = endDate => {
    this.setState({event: {...this.state.event, dtend: endDate}})
  };

  closeConfigShow = (closeOnEscape) => () => {
    this.setState({ closeOnEscape, open: true })
  }

  close = () => this.setState({ open: false })

  setResourceData(extraResources) {
    this.setState({extraResources: extraResources.target.value})
  }

  setPriorityData(extraPriority) {
    this.setState({extraPriority: extraPriority.target.value})
  }

  handleTzidChange = (e, { value }) => this.setState({ value })

  handleSubmit = (e) =>{
    e.preventDefault();
    let databody = this.state.user.username ? {...this.state.event, username: this.state.user.username} : this.state.event;
    const headers = { 'Content-Type': 'application/json' };
    axios.post('/api/events/save', databody, { headers });
    this.setState({redirect: true});
    this.clearForm();
 }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to='/myevents' />
    }
        const { open, closeOnEscape } = this.state;
        const {value} = this.state;
        const{tzidValue} = this.state;
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
                <div>
                <Form size='huge'>
                <Form.Field
                    style={{ position: 'relative', width: '166%', right: '33%' }}
                    id='autocomplete'
                    label='Location'
                    control={Input}
                    name='location'
                    value={this.state.location}
                    onChange={this.handleLocationChange}
                 />
                </Form>
                </div>

            <div>
        <Button size='medium' style={{ position: 'relative', top: '-100px',  width: '100%' }} onClick={this.closeConfigShow(false, true)}>
          Extra Options
        </Button>
                <Modal
                  open={open}
                  closeOnEscape={closeOnEscape}
                  onClose={this.close}
                  as={Form} >

                <Modal.Header>Extra Options</Modal.Header>
                  <Modal.Content>
                    <Form.Group widths='equal'>
                      <Form.Input
                        fluid
                        label='Priority'
                        placeholder='Enter a number (0-9)'
                        onChange={this.setPriorityData}
                        value={this.state.extraPriority}
                      />
                  <Form.Select
                    fluid
                    search
                    onChange={this.handleTzidChange}
                    value={value}
                    label='Time Zone'
                    options={TimeZones}
                    placeholder='Time Zone'

                  />
                    </Form.Group>
                    <Form.TextArea
                        label='Resources'
                        onChange={this.setResourceData}
                        value={this.state.extraResources}
                        placeholder='Equipment/Resources to bring' />
                  </Modal.Content>
                  <Modal.Actions>
                    <Form.Button
                      type='submit'
                      onClick= {this.close}
                      positive
                      labelPosition='right'
                      icon='checkmark'
                      content='Save and Close'
                    />
                  </Modal.Actions>
                </Modal>
                </div>
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
import React, { Component } from 'react';
import { Form, Input, Checkbox, Radio, Modal, TextArea, Message, Segment, Button, Header } from 'semantic-ui-react'
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
const recurrenceOptions = [
  { value: 'NONE', text: 'None' },
  { value: 'DAILY', text: 'Daily' },
  { value: 'WEEKLY', text: 'Weekly' },
  { value: 'MONTHLY', text: 'Monthly' },
  { value: 'ANNUALLY', text: 'Annually' },
]

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
        geocode: '',
        dtstart: '',
        dtend: '',
        summary: '',
        recurrence: '',
        tzid: '',
        priority: '',
        resources: '',
        rsvp: false,
        sentby: '',
        mailto: ''
      },
      isSignedIn: false,
      user: null,
      redirect: false
    }
    this.handleLocationSelect = this.handleLocationSelect.bind(this);
    this.setSentByData = this.setSentByData.bind(this);
    this.setMailTo = this.setMailTo.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSaveFile = this.onSaveFile.bind(this);
    this.handleRecurrenceChange = this.handleRecurrenceChange.bind(this);

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

  handleCheckboxChange = () => {
    let newRSVP = !(this.state.event.rsvp);
    this.setState({event: {...this.state.event, rsvp: newRSVP}});
    console.log(newRSVP);
  }

  handleInputChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({event: {...this.state.event, [name]: value}})
  }

    handleRecurrenceChange = (e, { value }) =>{
      this.setState({ value });
      this.setState({event: {...this.state.event, recurrence: value}})
    }

    handleLocationSelect = e => {
      let addressObject = this.autocomplete.getPlace();
      let lat = addressObject.geometry.location.lat();
      let lng = addressObject.geometry.location.lng();
      this.setState({event: {...this.state.event, location: addressObject.formatted_address }})
      this.setState({event: {...this.state.event, geocode: lat + ';' + lng }})
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
    this.setState({event: {...this.state.event, resources: extraResources.target.value}})
  }

    setSentByData(extraSentBy) {
      this.setState({extraSentBy: extraSentBy.target.value})
      this.setState({event: {...this.state.event, sentby: extraSentBy.target.value}})
    }

    setMailTo(extraMailTo) {
      this.setState({extraMailTo: extraMailTo.target.value})
      this.setState({event: {...this.state.event, mailto: extraMailTo.target.value}})
    }

  setPriorityData(extraPriority) {
    this.setState({extraPriority: extraPriority.target.value})
    this.setState({event: {...this.state.event, priority: extraPriority.target.value}})
  }


  handleTzidChange = (e, { value }) =>{
    this.setState({ value });
    this.setState({event: {...this.state.event, tzid: value}})
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
        const { open, closeOnEscape } = this.state;
        const {value} = this.state;
        const {tzidvalue} = this.state;
    return (
      <div className="App">
        {/* Render the data if we have it */}
            <div>
            <NavBar />
            <Segment inverted color='black' size='huge' className='add-an-event-segment'>
                <Header as='h1' textAlign='center'> Add an Event </Header>
            </Segment>
              <div class='form'>
                  <div>
                      {JSON.stringify(this.state.event)}
                  </div>
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
                <Form.Select
                     name='recurrence'
                     placeholder='Select Recurrence'
                     label='Recurrence Options'
                     fluid
                     search
                     selection
                     options={recurrenceOptions}
                     onChange={this.handleRecurrenceChange}
                   />
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
                    name='tzid'
                    value={value}
                    label='Time Zone'
                    options={TimeZones}
                    placeholder='Time Zone'
                    onChange={this.handleTzidChange}
                  />
                    </Form.Group>
                    <Form.TextArea
                        label='Resources'
                        name='resources'
                        onChange={this.setResourceData}
                        value={this.state.extraResources}
                        control={Input}
                        placeholder='Equipment/Resources to bring' />
                      <Form.Group inline>
                        <Form.TextArea
                            label='Sent by'
                            name='Sent by'
                            onChange={this.setSentByData}
                            value={this.state.extraSentBy}
                            control={Input}
                            placeholder='joe@schmoe.com' />
                        <Form.TextArea
                            label='Mail to'
                            name='Mail to'
                            onChange={this.setMailTo}
                            value={this.state.extraMailTo}
                            control={Input}
                            placeholder='joe@schmoe.com' />
                         <Form.Checkbox
                            label='Request RSVP'
                            name='rsvp'
                            checked={this.state.event.rsvp}
                            control={Checkbox}
                            onChange={this.handleCheckboxChange} />
                            </Form.Group>
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
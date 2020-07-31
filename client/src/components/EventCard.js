import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react'

const axios = require('axios');
const FileSaver = require('file-saver');

const icsText = (data) => {
  let str = 'BEGIN:VCALENDAR' + '\n' +
  'VERSION:2.0' + '\n' + 
  'BEGIN:VEVENT' + '\n' + 
  'CLASS:PUBLIC' + '\n' + 
  'DESCRIPTION:' + data.name.toString() + '\n';

  //Temp comment out tzid as it doesn't work
    /*str+='DTSTART;TZID=' + data.tzid.toString() + ':' + data.dtstart.toString() + '\n' +
    'DTEND;TZID=' + data.tzid.toString() + ':' + data.dtend.toString() + '\n';*/

  str+='DTSTART:' + data.dtstart.toString() + '\n' +
  'DTEND:' + data.dtend.toString() + '\n';
  if(data.recurrence){
    str += 'RRULE:FREQ=' + data.recurrence.toString() + '\n';
  }
  if(data.location){
    str+='LOCATION:' + data.location.toString() + '\n'
  }
  str+=
  'SUMMARY;LANGUAGE=en-us:' + data.description.toString() + '\n';
  if(data.resources){
    str += 'RESOURCES:' + data.resources.toString() + '\n';
  }
  if(data.priority){
    str+='PRIORITY:' + data.priority.toString() + '\n';
  }
  str+=
  'END:VEVENT' + '\n' +
  'END:VCALENDAR';
   return str;
}

class MyEvents extends Component {
  constructor(props){
    super(props);
    this.onTestSaveFile = this.onTestSaveFile.bind(this);
  }
  onTestSaveFile() {
      let blob = new Blob([icsText(this.props.event)], {type: "text/plain;charset=utf-8"});
      FileSaver.saveAs(blob, this.props.event._id.toString() + ".ics");
  }

    deleteEvent(id) {
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
        {this.props.event!=null ? (
            <div>
              <Grid columns='equal'>
                <Grid.Column>
                  {this.props.event.name}
                </Grid.Column>
                <Grid.Column>
                  {this.props.event.description}
                </Grid.Column>
                <Grid.Column>
                  {this.props.event.dtstart}
                </Grid.Column>
                <Grid.Column>
                  {this.props.event.dtend}
                </Grid.Column>
                <Grid.Column>
                  <Button secondary onClick={this.onTestSaveFile}>Download</Button>
                  <Button secondary onClick={this.deleteEvent}>Delete</Button>
                </Grid.Column>
              </Grid>
          </div>
        ) : (
          <div>
              <Grid columns='equal'>
                <Grid.Column>
                  Check-in
                </Grid.Column>
                <Grid.Column>
                  Meeting w/ Nancy
                </Grid.Column>
                <Grid.Column>
                  July 17th, 1:00 p.m.
                </Grid.Column>
                <Grid.Column>
                  July 17th, 1:05 p.m.
                </Grid.Column>
                <Grid.Column>
                 <Button secondary>View More</Button>
                </Grid.Column>
              </Grid>
          </div>
        )}
      </div>
    );
  }
}

export default MyEvents;
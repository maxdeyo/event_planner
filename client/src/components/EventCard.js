import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react'
import * as toIcsFile from '../data/toIcsFile';
const FileSaver = require('file-saver');

class MyEvents extends Component {
  constructor(props){
    super(props);
    this.onTestSaveFile = this.onTestSaveFile.bind(this);
  }
  onTestSaveFile() {
      let blob = new Blob([toIcsFile.icsText(this.props.event)], {type: "text/plain;charset=utf-8"});
      FileSaver.saveAs(blob, this.props.event.name + ".ics");
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
                  {new Date(this.props.event.dtstart).toLocaleString()}
                </Grid.Column>
                <Grid.Column>
                  {new Date(this.props.event.dtend).toLocaleString()}
                </Grid.Column>
                <Grid.Column>
                  <Button secondary onClick={this.onTestSaveFile}>Download</Button>
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
import React, { Component } from 'react';
import './App.css';

import FormTest from './FormTest';

class App extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      events: null
    }
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

  render() {

    return (
      <div className="App">
        {/* Render the data if we have it */}
        {this.state.events!=null ? (
          <div>
            <h1>{JSON.stringify(this.state.events)}</h1>
            <a
              href='/files/myfile.ics'
              download>
              Download?
            </a>
            <FormTest />
          </div>
        ) : (
          // Render a helpful message otherwise
          <div>
            <FormTest />
            <h1>No data :(</h1>
          </div>
        )}
      </div>
    );
  }
}

export default App;
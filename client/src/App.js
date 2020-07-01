import React, { Component } from 'react';
import './App.css';

class App extends Component {
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
    fetch('/files/bye.txt');
  }

  render() {
    const { test } = this.state;

    return (
      <div className="App">
        {/* Render the data if we have it */}
        {test!=null ? (
          <div>
            <h1>{test.test}</h1>
            <a
              href="http://localhost:5000/files/bye.txt"
              download>
              Download?
            </a>
          </div>
        ) : (
          // Render a helpful message otherwise
          <div>
            <h1>No data :(</h1>
            <button
              className="more"
              onClick={this.getFile}>
              Try Again?
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
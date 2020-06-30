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

  render() {
    const { test } = this.state;

    return (
      <div className="App">
        {/* Render the data if we have it */}
        {test!=null ? (
          <div>
            <h1>{test.test}</h1>
          </div>
        ) : (
          // Render a helpful message otherwise
          <div>
            <h1>No data :(</h1>
            <button
              className="more"
              onClick={this.getData}>
              Try Again?
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default App;
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  // Initialize state
  state = { test: 'null' }

  // Fetch passwords after first mount
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    // Get the passwords and store them in state
    fetch('/api/test')
      .then(res => res.json())
      .then(test => this.setState({ test }));
  }

  render() {
    const { test } = this.state;

    return (
      <div className="App">
        {/* Render the passwords if we have them */}
        {passwords!=null ? (
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
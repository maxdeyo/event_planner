import React from 'react';
import { Form, Input, Header } from 'semantic-ui-react';

/* global google */
const axios = require('axios')

class Autocomplete extends React.Component {
  constructor(props) {
    super(props)
    this.state = null;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.autocomplete = null;
  }

  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), {})
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
     let databody = this.state.event;
        const headers = { 'Content-Type': 'application/json' };
        axios.post('/api/events/save', databody, { headers });
  }

  render() {
    return(
      <div>
        <Form size='huge' onSubmit={this.handleSubmit}>
        <Form.Field
            style={{ position: 'relative', width: '166%', right: '33%' }}
            id='autocomplete'
            label='Location'
            control={Input}
            name='input-field'
            ref="input"
            onChange={this.handleInputChange}
            type="text"/>
        </Form>
      </div>
    )
  }

}

export default Autocomplete;
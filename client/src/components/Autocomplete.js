import React from 'react';
import { Form, Input, Header } from 'semantic-ui-react';

/* global google */
const axios = require('axios')

class Autocomplete extends React.Component {
  constructor(props) {
    super(props)
    this.state = null;
    this.handleChange = this.handleChange.bind(this);
    this.autocomplete = null;
  }

  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), {})
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  render() {
    return(
      <div>
        <Form size='huge' onSubmit={this.props.onChange}>
        <Form.Field
            style={{ position: 'relative', width: '166%', right: '33%' }}
            id='autocomplete'
            label='Location'
            control={Input}
            name='location'
            ref="input"
            onChange={this.props.onChange}
            type="text"/>
        </Form>
      </div>
    )
  }

}

export default Autocomplete;
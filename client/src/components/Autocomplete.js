import React from 'react';
import { Form, Input, Header } from 'semantic-ui-react';

/* global google */
const axios = require('axios')

class Autocomplete extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
       location: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.autocomplete = null;
  }

  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), {})
  }

<<<<<<< HEAD
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }
=======
  handleChange = location => {
    this.setState({
      location
        });
     };
>>>>>>> b4388ccedc781fdec50c445b8ee43b8e2fb01c68

  render() {
    return(
      <div>
<<<<<<< HEAD
        <Form size='huge' onSubmit={this.props.onChange}>
=======
        <Form size='huge'>
>>>>>>> b4388ccedc781fdec50c445b8ee43b8e2fb01c68
        <Form.Field
            style={{ position: 'relative', width: '166%', right: '33%' }}
            id='autocomplete'
            label='Location'
            control={Input}
            name='location'
            ref="input"
<<<<<<< HEAD
            onChange={this.props.onChange}
=======
            onChange={this.handleChange}
>>>>>>> b4388ccedc781fdec50c445b8ee43b8e2fb01c68
            type="text"/>
        </Form>
      </div>
    )
  }

}

export default Autocomplete;
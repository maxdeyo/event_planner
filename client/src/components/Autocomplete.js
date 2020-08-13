import React from 'react';
import { Form, Input, Header } from 'semantic-ui-react';

/* global google */

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

  handleChange = location => {
    this.setState({
      location
        });
     };

  render() {
    return(
      <div>
        <Form size='huge'>
        <Form.Field
            style={{ position: 'relative', width: '166%', right: '33%' }}
            id='autocomplete'
            label='Location'
            control={Input}
            name='input-field'
            ref="input"
            onChange={this.handleChange}
            type="text"/>
        </Form>
      </div>
    )
  }

}

export default Autocomplete;
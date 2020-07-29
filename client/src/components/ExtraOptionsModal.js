import React from 'react';
import ReactDOM from "react-dom";
import TimeZones from '../data/timezones.js';
import { Form, Input, Modal, Button, Header } from 'semantic-ui-react';

const priorityOptions = [
  { key: 'n', text: 'None', value: '0' },
  { key: 'h', text: 'High', value: '1' },
  { key: 'l', text: 'Low', value: '9' },
  { key: 'm', text: 'Medium', value: '4' },
];

const options = TimeZones.map(({ ID, Timezone }) => ({ value: ID, text: Timezone }))

class ExtraOptionsModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        open: false,
         };
    }

  closeConfigShow = (closeOnEscape) => () => {
    this.setState({ closeOnEscape, open: true })
  }

  handleChange = (e, option) => {
    let value = TimeZones.value;
    this.setState({ selected: {value}})
  }

  close = () => this.setState({ open: false })

  render() {
    const { open, closeOnEscape } = this.state;
    return (
      <div>
        <Button size='medium' style={{ position: 'relative', top: '-100px',  width: '100%' }} onClick={this.closeConfigShow(false, true)}>
          Extra Options
        </Button>

        <Modal
          open={open}
          closeOnEscape={closeOnEscape}
          onClose={this.close}
          as={Form}
        >
          <Modal.Header>Extra Options</Modal.Header>
          <Modal.Content>
            <Form.Group widths='equal'>
              <Form.Select
                fluid
                label='Priority'
                options={priorityOptions}
                placeholder='Priority'
              />
              <Form.Select
                fluid
                selection
                search
                id='timezoneoptions'
                label='Time Zone'
                options={options}
                onClick={this.handleChange}
                placeholder='Time Zone'
              />
            </Form.Group>
            <Form.TextArea label='Resources' placeholder='Equipment/Resources to bring' />
            <Form.Checkbox label='Check to request RSVP' />
          </Modal.Content>
          <Modal.Actions>
            <Form.Button
              type='submit'
              onClick={this.close}
              positive
              labelPosition='right'
              icon='checkmark'
              content='Save and Close'
            />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default ExtraOptionsModal
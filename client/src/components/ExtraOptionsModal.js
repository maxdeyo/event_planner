import React, { PropTypes } from 'react';
import ReactDOM from "react-dom";
import TimeZones from '../data/timezones.js';
import { Form, Input, Modal, Button, Header } from 'semantic-ui-react';

class ExtraOptionsModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    open: false,
    extraPriority: '',
    extraTzid: '',
    extraResources: '',
    };
        this.setResourceData = this.setResourceData.bind(this);
        this.setPriorityData = this.setPriorityData.bind(this);
        this.handleTzidChange = this.handleTzidChange.bind(this);
    }

   handleSubmit(e) {
    e.preventDefault();
   }



  render() {
    const { open, closeOnEscape } = this.state;
    const {value} = this.state;
    const{tzidValue} = this.state;
    return (
      <div>
        <Button size='medium' style={{ position: 'relative', top: '-100px',  width: '100%' }} onClick={this.closeConfigShow(false, true)}>
          Extra Options
        </Button>

        <Modal
          open={open}
          closeOnEscape={closeOnEscape}
          onClose={this.close}
          as={Form} >

        <Modal.Header>Extra Options</Modal.Header>
          <Modal.Content>
            <Form.Group widths='equal'>
              <Form.Input
                fluid
                label='Priority'
                placeholder='Enter a number (0-9)'
                onChange={this.setPriorityData}
                value={this.state.extraPriority}
              />
          <Form.Select
            fluid
            search
            onChange={this.handleTzidChange}
            value={value}
            label='Time Zone'
            options={TimeZones}
            placeholder='Time Zone'

          />
            </Form.Group>
            <Form.TextArea
                label='Resources'
                onChange={this.setResourceData}
                value={this.state.extraResources}
                placeholder='Equipment/Resources to bring' />
          </Modal.Content>
          <Modal.Actions>
            <Form.Button
              type='submit'
              onClick= {this.close}
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
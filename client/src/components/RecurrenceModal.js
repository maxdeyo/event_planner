import React from 'react'
import { Form } from 'semantic-ui-react'

const recurrenceOptions = [
  { key: 'af', value: 'DAILY', text: 'Daily' },
  { key: 'ax', value: 'WEEKLY', text: 'Weekly' },
  { key: 'al', value: 'MONTHLY', text: 'Monthly' },
  { key: 'dz', value: 'ANNUALLY', text: 'Annually' },
  //{ key: 'as', value: 'as', text: 'Custom...' },
]


class RecurrenceModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    };
    }
  handleSelectChange=(e,{value})=>this.setState({recurrence:value})

  render() {
    return (
      <Form.Select
        placeholder='Select Recurrence'
        label='Recurrence Options'
        fluid
        search
        selection
        value={this.props.val}
        onChange={this.props.onChange}
        options={recurrenceOptions}
      />
    )}
}

export default RecurrenceModal
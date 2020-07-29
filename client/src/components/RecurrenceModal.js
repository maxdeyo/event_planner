import React from 'react'
import { Form } from 'semantic-ui-react'

const recurrenceOptions = [
  { key: 'af', value: 'af', text: 'Daily' },
  { key: 'ax', value: 'ax', text: 'Aland Weekly' },
  { key: 'al', value: 'al', text: 'Monthly' },
  { key: 'dz', value: 'dz', text: 'Annually' },
  { key: 'as', value: 'as', text: 'Custom...' },
]

class RecurrenceModal extends React.Component {

  render() {
    return (
      <Form.Select
        placeholder='Select Recurrence'
        label='Recurrence Options'
        fluid
        search
        selection
        options={recurrenceOptions}
      />
    )}
}

export default RecurrenceModal
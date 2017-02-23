import React, { Component, PropTypes } from 'react'
import { Form, Input, Dropdown } from 'semantic-ui-react'

const FormGroup = Form.Group
const FormField = Form.Field

const options = [
  { key: 'English', text: 'English', value: 'English' },
  { key: 'French', text: 'French', value: 'French' },
  { key: 'Spanish', text: 'Spanish', value: 'Spanish' },
  { key: 'German', text: 'German', value: 'German' },
  { key: 'Chinese', text: 'Chinese', value: 'Chinese' },
]

class EquationForm extends Component {
  state = { options }

  handleAddition = (e, { value }) => {
    this.setState({
      options: [{ text: value, value }, ...this.state.options],
    })
  }

  handleChange = (e, { value }) => this.setState({ currentValues: value })

  render () {
    const { currentValues } = this.state

    return (
      <Form>
        <FormGroup widths='equal'>
          <FormField>
            <label>Equation</label>
            <Input placeholder='Name' />
          </FormField>
          <FormField>
            <label>Note</label>
            <Input placeholder='Description' />
          </FormField>
          <FormField>
            <label>Tags</label>
            <Dropdown
              options={this.state.options}
              placeholder='Choose Tags'
              search
              selection
              fluid
              multiple
              allowAdditions
              value={currentValues}
              onAddItem={this.handleAddition}
              onChange={this.handleChange}
            />
          </FormField>
        </FormGroup>
      </Form>
    )
  }
}

EquationForm.propTypes = {

}

export default EquationForm

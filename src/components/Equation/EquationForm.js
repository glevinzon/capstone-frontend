import React, { Component, PropTypes } from 'react'
import { Form, Input, Dropdown } from 'semantic-ui-react'

const FormGroup = Form.Group
const FormField = Form.Field

class EquationForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      stateOptions: [
        { key: 'English', text: 'English', value: 'English' },
        { key: 'French', text: 'French', value: 'French' },
        { key: 'Spanish', text: 'Spanish', value: 'Spanish' },
        { key: 'German', text: 'German', value: 'German' },
        { key: 'Chinese', text: 'Chinese', value: 'Chinese' }
      ]
    }
  }

  handleAddition = (e, { value }) => {
    this.setState({
      stateOptions: [{ text: value, value }, ...this.state.stateOptions]
    })
  }

  handleChange = (e, { value }) => this.setState({ stateOptions: value })

  render () {
    const { stateOptions } = this.state
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
              options={this.state.stateOptions}
              placeholder='Choose Tags'
              search
              selection
              fluid
              multiple
              allowAdditions
              value={stateOptions}
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

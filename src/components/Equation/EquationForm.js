import React, { Component, PropTypes } from 'react'
import { Form, Input } from 'semantic-ui-react'

const FormGroup = Form.Group
const FormField = Form.Field

class EquationForm extends Component {
  render () {
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
            <Input placeholder='Tags' />
          </FormField>
        </FormGroup>
      </Form>
    )
  }
}

EquationForm.propTypes = {

}

export default EquationForm

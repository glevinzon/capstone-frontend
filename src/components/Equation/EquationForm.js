import React, { Component, PropTypes } from 'react'
import { Button, Form, Input, Dropdown } from 'semantic-ui-react'
import validateInput from 'utils/validators/equation'
import Upload from './common/Upload'

const FormGroup = Form.Group
const FormField = Form.Field

class EquationForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      options: [],
      username: props.username,
      name: '',
      note: '',
      isLoading: false,
      errors: {}
    }
  }

  componentWillMount () {
    let {tags} = this.props
    let options = []

    tags.map(value => {
      options.push({ key: value.name, text: value.name, value: value.name })
    })

    this.setState({options: options})
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.equations.creatingShop) {
      this.setState({ isLoading: true })
    }
    if (nextProps.equations.createSuccess) {
      this.setState({ name: '', note: '', errors: [], isLoading: false, currentValues: [] })
    }
  }

  handleAddition = (e, { value }) => {
    this.setState({
      options: [{ text: value, value }, ...this.state.options]
    })
  }

  handleChange = (e, { value }) => {
    this.setState({ currentValues: value })
  }

  onTextChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  isValid = (data) => {
    const { errors, isValid } = validateInput(data)

    if (!isValid) {
      this.setState({ errors, isLoading: false })
    }

    return isValid
  }

  onSubmit = (e) => {
    e.preventDefault()
    let data = this.state
    if (this.isValid(data)) {
      this.setState({ errors: {}, isLoading: true })
      this.props.createEquation(data)
    }
  }

  render () {
    const { currentValues, isLoading } = this.state
    return (
      <div className='ui container'>
        <Upload />
        <Form loading={isLoading} onSubmit={this.onSubmit}>
          <FormGroup widths='equal'>
            <FormField>
              <label>Equation</label>
              <Input placeholder='Name' name='name' value={this.state.name} onChange={this.onTextChange} />
            </FormField>
            <FormField>
              <label>Note</label>
              <Input placeholder='Description' name='note' value={this.state.note} onChange={this.onTextChange} />
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
            <Button positive type='submit'>Submit</Button>
          </FormGroup>
        </Form>
      </div>
    )
  }
}

EquationForm.propTypes = {
  createEquation: PropTypes.func,
  tags: PropTypes.array
}

export default EquationForm

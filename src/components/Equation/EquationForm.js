import React, { Component, PropTypes } from 'react'
import { Button, Form, Input, Dropdown } from 'semantic-ui-react'
import validateInput from 'utils/validators/equation'
import Alert from 'react-s-alert'

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
      errors: {},
      id: props.id ? props.id : '',
      name: props.name ? props.name : '',
      note: props.note ? props.note : '',
      keywords: props.keywords ? props.keywords : ''
    }
  }

  componentWillMount () {
    let {tags} = this.props
    let options = []

    tags.map(value => {
      options.push({ key: value.name, text: value.name, value: value.name })
    })

    this.setState({options: options, currentValues: this.state.keywords})
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      id: nextProps.id,
      name: nextProps.name,
      note: nextProps.note,
      currentValues: nextProps.keywords
    })
    if (nextProps.equations.creatingEquation) {
      this.setState({ isLoading: true })
    }
    if (nextProps.equations.createSuccess || nextProps.equations.updateSuccess) {
      this.setState({ name: '', note: '', errors: [], isLoading: false, currentValues: [] })
      this.props.getEquations('paginate', 1, 15)
      if (!this.state.isLoading) {
        Alert.success('Success', {
          position: 'top-right',
          effect: 'scale'
        })
      }
    }
    if (nextProps.equations.updateSuccess) {
      this.props.onSubmit()
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    return this.state != nextState
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
    console.log(errors, isValid)

    if (!isValid) {
      if (errors) {
        Alert.error('<h4>Errors!</h4><ul>' + (errors.name ? (`<li>${errors.name}</li>`) : '') + (errors.note ? (`<li>${errors.note}</li>`) : '') + '</ul>', {
          position: 'top-right',
          effect: 'scale',
          html: true
        })
      }
      this.setState({ errors, isLoading: false })
    }

    return isValid
  }

  onSubmit = (e) => {
    e.preventDefault()
    let data = this.state
    if (this.isValid(data)) {
      this.setState({ errors: {}, isLoading: true })
      if (this.state.id) {
        this.props.updateEquation(data)
      } else {
        this.props.createEquation(data)
      }
    }
  }

  render () {
    const { currentValues, isLoading } = this.state
    return (
      <div className='ui container'>
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

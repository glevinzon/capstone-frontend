import React, { Component, PropTypes } from 'react'
import EquationList from './EquationList'
import EquationForm from './EquationForm'
import { Dimmer, Button, Segment, Form, Input, Menu, Grid } from 'semantic-ui-react'
import validateInput from 'utils/validators/username'

const MenuItem = Menu.Item
const MenuMenu = Menu.Menu
const FormField = Form.Field
class componentName extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeItem: 'browse',
      username: '',
      active: false,
      errors: [],
      isLoading: false
    }
    this.props.getEquations('paginate', 1, 15)
  }

  componentDidMount () {
    let {username} = this.state
    if (username === '') {
      this.handleOpen()
    } else {
      this.handleClose()
    }
  }

  handleOpen = () => this.setState({ active: true })
  handleClose = () => {
    let {username} = this.state
    username === ''
    ? this.setState({ active: true })
    : this.setState({ active: false })
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

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
      this.handleClose()
    }
  }
  render () {
    const { username, activeItem, active } = this.state
    let { list } = this.props.equations
    return (
      <div>
        <Dimmer
          active={active}
          onClickOutside={this.handleClose}
          page
          >
          <div>
            <Grid centered columns={7}>
              <Grid.Column>
                <Form inverted onSubmit={this.onSubmit}>
                  <FormField inline>
                    <Input placeholder='Username' name='username' value={this.state.username} onChange={this.onTextChange} />
                  </FormField>
                  <Button type='submit'>Submit</Button>
                </Form>
              </Grid.Column>
            </Grid>
          </div>
        </Dimmer>
        <Menu pointing>
          <MenuItem name='browse' active={activeItem === 'browse'} onClick={this.handleItemClick} />
          <MenuItem name='submit' active={activeItem === 'submit'} onClick={this.handleItemClick} />
          <MenuMenu position='right'>
            <MenuItem>
              <Input icon='search' placeholder='Search...' />
            </MenuItem>
          </MenuMenu>
        </Menu>
        <Segment>
          {activeItem === 'browse' ? <EquationList list={list} {...this.props} /> : null}
          {activeItem === 'submit' ? <EquationForm username={username} {...this.props} /> : null}
        </Segment>

      </div>
    )
  }
}

componentName.propTypes = {

}

export default componentName

import React, { Component, PropTypes } from 'react'
import EquationSearch from './EquationSearch'
import EquationList from './EquationList'
import EquationForm from './EquationForm'
import SearchResults from './SearchResults'
import Stats from './Statistics'
import { Dimmer, Button, Segment, Form, Input, Menu, Grid, Loader } from 'semantic-ui-react'
import validateInput from 'utils/validators/username'
var empty = require('is-empty')
var _ = require('lodash')

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
      isLoading: false,
      isSearching: false
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

  componentWillReceiveProps (nextProps) {
    let { fetchingEquationBySearch } = nextProps.equations
    if (fetchingEquationBySearch) {
      this.setState({isSearching: true})
    } else {
      this.setState({isSearching: false})
    }
  }

  handleOpen = () => this.setState({ active: true })
  handleClose = () => {
    let {username} = this.state
    username === ''
    ? this.setState({ active: true })
    : this.setState({ active: false })
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    this.props.getEquations('paginate', 1, 15)
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
      this.handleClose()
    }
  }

  render () {
    const { username, activeItem, active, isSearching } = this.state
    let { list, fetchingEquationSuccess } = this.props.equations

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
                  <Button positive type='submit'>Submit</Button>
                </Form>
              </Grid.Column>
            </Grid>
          </div>
        </Dimmer>
        <Menu className='ui container' pointing>
          <MenuItem name='browse' active={activeItem === 'browse'} onClick={this.handleItemClick} />
          <MenuItem name='submit' active={activeItem === 'submit'} onClick={this.handleItemClick} />
          <MenuMenu position='right'>
            <MenuItem>
              {list && !empty(list) ? <Stats color='grey' value={list.equations.total} label='Equations' {...this.props} /> : null}
            </MenuItem>
          </MenuMenu>
          <MenuMenu position='right'>
            <MenuItem>
              {list && !empty(list) ? <Stats color='grey' value={list.tags.length} label='Tags' {...this.props} /> : null}
            </MenuItem>
          </MenuMenu>
          <MenuMenu position='right'>
            <MenuItem>
              {list && !empty(list) ? <EquationSearch {...this.props} /> : null}
            </MenuItem>
          </MenuMenu>
        </Menu>
        <Segment>
          <Dimmer active={isSearching}>
            <Loader content='Searching' />
          </Dimmer>
          {activeItem === 'browse' && !empty(list) && fetchingEquationSuccess === false ? <EquationList tags={list.tags} records={list.records} list={list.equations} {...this.props} /> : null}
          {activeItem === 'submit' && !empty(list) && fetchingEquationSuccess === false ? <EquationForm tags={list.tags} username={username} {...this.props} /> : null}
          {fetchingEquationSuccess === true ? <SearchResults tags={list.tags} records={list.records} {...this.props} /> : null}
        </Segment>

      </div>
    )
  }
}

componentName.propTypes = {
  getEquations: PropTypes.func,
  equations: PropTypes.object
}

export default componentName

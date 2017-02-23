import React, { Component, PropTypes } from 'react'
import EquationList from './EquationList'
import EquationForm from './EquationForm'
import { Input, Menu, Segment } from 'semantic-ui-react'

const MenuItem = Menu.Item
const MenuMenu = Menu.Menu

class componentName extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeItem: 'browse'
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render () {
    const { activeItem } = this.state
    return (
      <div>
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
          {activeItem === 'browse' ? <EquationList {...this.props} /> : null}
          {activeItem === 'submit' ? <EquationForm {...this.props} /> : null}
        </Segment>

      </div>
    )
  }
}

componentName.propTypes = {

}

export default componentName

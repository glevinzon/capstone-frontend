import React, { Component, PropTypes } from 'react'
import {Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'

class componentName extends Component {
  render () {
    console.log(this.props)
    return (
      <div className='container'>
        <Nav bsStyle='tabs' justified activeKey={1} onSelect={this.handleSelect}>
          <NavItem eventKey={1} href='/home'>NavItem 1 content</NavItem>
          <NavItem eventKey={2} title='Item'>NavItem 2 content</NavItem>
          <NavItem eventKey={3} disabled>NavItem 3 content</NavItem>
        </Nav>
        <br />
        <Nav bsStyle='pills' justified activeKey={1} onSelect={this.handleSelect}>
          <NavItem eventKey={1} href='/home'>NavItem 1 content</NavItem>
          <NavItem eventKey={2} title='Item'>NavItem 2 content</NavItem>
          <NavItem eventKey={3} disabled>NavItem 3 content</NavItem>
        </Nav>
      </div>
    )
  }
}

componentName.propTypes = {

}

export default componentName

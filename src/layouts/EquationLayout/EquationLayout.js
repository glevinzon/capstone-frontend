import React, { Component, PropTypes } from 'react'

class EquationLayout extends Component {
  render () {
    return (
      <div className='container-fluid'>
        {this.props.children}
      </div>
    )
  }
}

EquationLayout.propTypes = {

}

export default EquationLayout

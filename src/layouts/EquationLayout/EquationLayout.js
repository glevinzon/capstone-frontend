import React, { Component, PropTypes } from 'react'
import Alert from 'react-s-alert'

import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/scale.css'

class EquationLayout extends Component {
  render () {
    return (
      <div className='container-fluid'>
        {this.props.children}
        <Alert stack={{limit: 3}} />
      </div>
    )
  }
}

EquationLayout.propTypes = {

}

export default EquationLayout

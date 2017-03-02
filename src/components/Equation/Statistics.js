import React, { Component, PropTypes } from 'react'
import { Statistic } from 'semantic-ui-react'

class Statistics extends Component {
  render () {
    return (
      <Statistic size='tiny' horizontal color={this.props.color} value={this.props.value} label={this.props.label} />
    )
  }
}

Statistics.propTypes = {

}

export default Statistics

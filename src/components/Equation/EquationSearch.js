import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import { Search, Grid, Header } from 'semantic-ui-react'

class EquationSearch extends Component {
  constructor (props) {
    super(props)
    this.tags = props.equations.list.tags.map(tag => ({
      title: tag.name,
      description: tag.name
    }))
    this.equationNames = props.equations.list.equations.data.map(eq => ({
      title: eq.name,
      description: eq.note
    }))
    this.equationNotes = props.equations.list.equations.data.map(eq => ({
      title: eq.note,
      description: eq.name
    }))

    this.source = this.tags.concat(this.equationNames).concat(this.equationNotes)

    console.log(this.source)
  }

  componentWillMount () {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, result) => this.setState({ value: result.title })

  handleSearchChange = (e, value) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(this.source, isMatch)
      })
    }, 500)
  }
  render () {
    const { isLoading, value, results } = this.state

    return (
      <Search
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={this.handleSearchChange}
        results={results}
        value={value}
        {...this.props}
      />
    )
  }
}

EquationSearch.propTypes = {
  equations: PropTypes.object
}

export default EquationSearch

import React, { Component, PropTypes } from 'react'
import { Icon, Dimmer, Loader, Menu, Table, Label } from 'semantic-ui-react'

const TableHeader = Table.Header
const TableRow = Table.Row
const TableHeaderCell = Table.HeaderCell
const TableBody = Table.Body
const TableCell = Table.Cell
const TableFooter = Table.Footer
const MenuItem = Menu.Item

class EquationList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      page: 1,
      count: 15,
      active: false
    }
  }

  componentWillReceiveProps (nextProps) {
    let {fetchingEquations} = nextProps.equations
    if (fetchingEquations) {
      this.setState({
        active: true
      })
    } else {
      this.setState({
        active: false
      })
    }
  }

  handlePaginationClick = (type) => {
    let { page, count } = this.state
    if (type === 'prev') {
      if (page === 1) {
        return
      }
      page -= 1
    } else {
      if (this.props.equations.list.equations.data.length === 0) {
        return
      }
      page += 1
    }
    this.props.getEquations('paginate', page, count)
    this.setState({page})
  }

  render () {
    console.log('TAGS', this.props.tags)
    console.log('RECORDS', this.props.records)
    let { list, tags, records } = this.props
    let { fetchingEquations } = this.props.equations
    let data = list.data !== undefined ? list.data : []
    return (
      <div className='ui container'>
        <Table color={'green'} celled>
          <Dimmer active={this.state.active}>
            <Loader size='large' content='Loading' />
          </Dimmer>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Note</TableHeaderCell>
              <TableHeaderCell>AudioUrl</TableHeaderCell>
              <TableHeaderCell>Tags</TableHeaderCell>
            </TableRow>
          </TableHeader>

          <TableBody>
          {data.map(value => {
            return (
              <TableRow>
                <TableCell>{value.name}</TableCell>
                <TableCell>{value.note}</TableCell>
                <TableCell>{value.audioUrl}</TableCell>
                <TableCell>{records.map(record => {
                  if (record.eqId === value.id) {
                    let keywords = []
                    tags.map(tag => {
                      if (record.tagId === tag.id) {
                        keywords.push(tag.name)
                      }
                    })
                    return (
                      keywords.map(key => {
                        return (<Label as='a' color='red' tag>{key}</Label>)
                      })
                    )
                  }
                })}</TableCell>
              </TableRow>
            )
          })}

          </TableBody>

          <TableFooter>
            <TableRow>
              <TableHeaderCell colSpan='5'>
                <Menu floated='right' pagination>
                  <MenuItem onClick={e => this.handlePaginationClick('prev')} disabled={this.state.page < 2 || fetchingEquations} as='a' icon>
                    <Icon name='left chevron' />
                  </MenuItem>
                  <MenuItem onClick={e => this.handlePaginationClick('next')} disabled={this.props.equations.list.equations.data.length === 0 || fetchingEquations} as='a' icon>
                    <Icon name='right chevron' />
                  </MenuItem>
                </Menu>
              </TableHeaderCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    )
  }
}

EquationList.propTypes = {
  getEquations: PropTypes.func,
  equations: PropTypes.object
}

export default EquationList

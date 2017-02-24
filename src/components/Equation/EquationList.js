import React, { Component, PropTypes } from 'react'
import { Icon, Label, Menu, Table } from 'semantic-ui-react'

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
      count: 15
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
      if (this.props.equations.list.length === 0) {
        return
      }
      page += 1
    }
    this.props.getEquations('paginate', page, count)
    this.setState({page})
  }

  render () {
    console.log(this.props)
    let { list } = this.props
    let { fetchingEquations } = this.props.equations
    let data = list.data !== undefined ? list.data : []
    return (
      <Table celled>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Note</TableHeaderCell>
            <TableHeaderCell>AudioUrl</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
        {data.map(value => {
          return (
            <TableRow>
              <TableCell>{value.name}</TableCell>
              <TableCell>{value.note}</TableCell>
              <TableCell>{value.audioUrl}</TableCell>
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
                <MenuItem onClick={e => this.handlePaginationClick('next')} disabled={this.props.equations.list.length === 0 || fetchingEquations} as='a' icon>
                  <Icon name='right chevron' />
                </MenuItem>
              </Menu>
            </TableHeaderCell>
          </TableRow>
        </TableFooter>
      </Table>
    )
  }
}

EquationList.propTypes = {
  getEquations: PropTypes.func,
  equations: PropTypes.object
}

export default EquationList

import React, { Component, PropTypes } from 'react'
import { Button, Checkbox, Icon, Table } from 'semantic-ui-react'

const TableHeader = Table.Header
const TableRow = Table.Row
const TableHeaderCell = Table.HeaderCell
const TableBody = Table.Body
const TableCell = Table.Cell
const TableFooter = Table.Footer

class EquationList extends Component {
  render () {
    return (
      <Table compact celled definition>
        <TableHeader>
          <TableRow>
            <TableHeaderCell />
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Note</TableHeaderCell>
            <TableHeaderCell>User</TableHeaderCell>
            <TableHeaderCell>URL</TableHeaderCell>
            <TableHeaderCell>Tags</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell collapsing>
              <Checkbox slider />
            </TableCell>
            <TableCell>a + b + c</TableCell>
            <TableCell>ei plus bi plus si</TableCell>
            <TableCell>admin</TableCell>
            <TableCell>/</TableCell>
            <TableCell>No</TableCell>
          </TableRow>
          <TableRow>
            <TableCell collapsing>
              <Checkbox slider />
            </TableCell>
            <TableCell>Circle</TableCell>
            <TableCell>A equals pie r squared</TableCell>
            <TableCell>admin</TableCell>
            <TableCell>/</TableCell>
            <TableCell>No</TableCell>
          </TableRow>
          <TableRow>
            <TableCell collapsing>
              <Checkbox slider />
            </TableCell>
            <TableCell>Distance</TableCell>
            <TableCell>(x1,y1) and (x2,y2)</TableCell>
            <TableCell>admin</TableCell>
            <TableCell>/</TableCell>
            <TableCell>No</TableCell>
          </TableRow>
        </TableBody>

        <TableFooter fullWidth>
          <TableRow>
            <TableHeaderCell />
            <TableHeaderCell colSpan='5'>
              <Button floated='right' icon labelPosition='left' primary size='small'>
                <Icon name='user' /> Add User
              </Button>
              <Button size='small'>Approve</Button>
              <Button disabled size='small'>Approve All</Button>
            </TableHeaderCell>
          </TableRow>
        </TableFooter>
      </Table>
    )
  }
}

EquationList.propTypes = {

}

export default EquationList

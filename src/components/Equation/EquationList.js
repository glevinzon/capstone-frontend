import React, { Component, PropTypes } from 'react'
import { Icon, Dimmer, Loader, Menu, Table, Label, Checkbox, Button, Modal, Header } from 'semantic-ui-react'

const TableHeader = Table.Header
const TableRow = Table.Row
const TableHeaderCell = Table.HeaderCell
const TableBody = Table.Body
const TableCell = Table.Cell
const TableFooter = Table.Footer
const MenuItem = Menu.Item
const ButtonGroup = Button.Group
const ModalContent = Modal.Content
const ModalActions = Modal.Actions

class EquationList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      page: 1,
      count: 15,
      active: false,
      id: null,
      isOpen: false
    }
  }

  componentWillReceiveProps (nextProps) {
    let { page, count } = this.state
    let {fetchingEquations, deletingEquation, deleteEquationSuccess} = nextProps.equations
    if (fetchingEquations || deletingEquation) {
      this.setState({
        active: true,
        isOpen: false
      })
    } else {
      this.setState({
        active: false
      })
    }
    if (deleteEquationSuccess) {
      this.props.getEquations('paginate', page, count)
    }
  }

  handleSearchByTag = (keyword) => {
    this.props.getEquationsBySearch('tag', keyword)
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

  handleDeleteClick = (eqId = null) => {
    let {isOpen} = this.state
    let {id} = this.state
    if (!isOpen) {
      this.setState({id: eqId, isOpen: true})
    } else {
      if (id) {
        this.props.deleteEquation(id)
      }
    }
  }

  render () {
    let { list, tags, records } = this.props
    let { fetchingEquations } = this.props.equations
    let data = list.data !== undefined ? list.data : []
    return (
      <div className='ui fluid container'>
        <Modal open={this.state.isOpen} basic size='small'>
          <Header icon='remove' content='Delete Equation' />
          <ModalContent>
            <p>Are you sure to delete this record?</p>
          </ModalContent>
          <ModalActions>
            <Button onClick={e => this.setState({isOpen: false})} basic color='red' inverted>
              <Icon name='remove' /> No
            </Button>
            <Button onClick={this.handleDeleteClick} color='green' inverted>
              <Icon name='checkmark' /> Yes
            </Button>
          </ModalActions>
        </Modal>
        <Table color={'green'} celled>
          <Dimmer active={this.state.active}>
            <Loader size='large' content='Loading' />
          </Dimmer>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Active</TableHeaderCell>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Note</TableHeaderCell>
              <TableHeaderCell>AudioUrl</TableHeaderCell>
              <TableHeaderCell>Tags</TableHeaderCell>
              <TableHeaderCell />
            </TableRow>
          </TableHeader>

          <TableBody>
          {data.map(value => {
            return (
              <TableRow>
                <TableCell collapsing>
                  <Checkbox toggle readOnly checked={value.active} />
                </TableCell>
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
                        return (<Label onClick={e => { this.handleSearchByTag(key) }} as='a' color='teal' tag>{key}</Label>)
                      })
                    )
                  }
                })}</TableCell>
                <TableCell>
                  <ButtonGroup>
                    <Button positive>Edit</Button>
                    <Button.Or />
                    <Button negative onClick={e => this.handleDeleteClick(value.id)}>Delete</Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            )
          })}

          </TableBody>

          <TableFooter>
            <TableRow>
              <TableHeaderCell colSpan='6'>
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
  deleteEquation: PropTypes.func,
  equations: PropTypes.object,
  list: PropTypes.object,
  tags: PropTypes.array,
  records: PropTypes.array,
  getEquationsBySearch: PropTypes.func
}

export default EquationList

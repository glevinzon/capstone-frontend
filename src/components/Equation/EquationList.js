import React, { Component, PropTypes } from 'react'
import { Icon, Dimmer, Loader, Menu, Table, Label, Checkbox, Button, Modal, Header } from 'semantic-ui-react'
import Upload from './common/Upload'
import Alert from 'react-s-alert'
var empty = require('is-empty')

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
      isOpen: false,
      isUploadModalOpen: false,
      uploadedFile: [],
      fileName: '',
      isLoading: false
    }
  }

  componentWillReceiveProps (nextProps) {
    let { page, count } = this.state
    let {fetchingEquations, deletingEquation, deleteEquationSuccess, uploadingFile, fileUploadSuccess} = nextProps.equations
    let {equationCreationErrors, equationUpdateErrors, deleteEquationErrors, uploadFileErrors} = nextProps.equations
    if (fetchingEquations || deletingEquation || uploadingFile) {
      this.setState({
        active: true,
        isOpen: false,
        isUploadModalOpen: false
      })
    } else {
      this.setState({
        active: false
      })
    }
    if (deleteEquationSuccess || fileUploadSuccess) {
      Alert.success('Success', {
        position: 'top-right',
        effect: 'scale'
      })
      this.props.getEquations('paginate', page, count)
    }

    if (!empty(equationCreationErrors)) {
      Alert.error(`<h4>Errors!</h4><ul><li>${equationCreationErrors.message}</li></ul>`, {
        position: 'top-right',
        effect: 'scale',
        html: true
      })
      this.props.getEquations('paginate', page, count)
    } else if (!empty(equationUpdateErrors)) {
      Alert.error(`<h4>Errors!</h4><ul><li>${equationUpdateErrors.message}</li></ul>`, {
        position: 'top-right',
        effect: 'scale',
        html: true
      })
      this.props.getEquations('paginate', page, count)
    } else if (!empty(deleteEquationErrors)) {
      Alert.error(`<h4>Errors!</h4><ul><li>${deleteEquationErrors.message}</li></ul>`, {
        position: 'top-right',
        effect: 'scale',
        html: true
      })
    } else if (!empty(uploadFileErrors)) {
      Alert.error(`<h4>Errors!</h4><ul><li>${uploadFileErrors.message}</li></ul>`, {
        position: 'top-right',
        effect: 'scale',
        html: true
      })
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

  handleUploadClick = (eqId = null) => {
    let {isUploadModalOpen} = this.state
    let {id} = this.state
    if (!isUploadModalOpen) {
      this.setState({id: eqId, isUploadModalOpen: true})
    } else {
      if (id) {
        const { uploadedFile } = this.state
        const data = new FormData()
        data.append('audio', uploadedFile[0])
        if (uploadedFile.length > 0) {
          this.setState({ isLoading: true })
          this.props.uploadFile(id, data)
        }
      }
    }
  }

  close = () => this.setState({ isUploadModalOpen: false })

  renderUploadModal = () => {
    const { isUploadModalOpen } = this.state

    return (
      <Modal
        open={isUploadModalOpen}
        closeOnEscape
        closeOnRootNodeClick
        onClose={this.close}
        >
        <ModalContent>
          <Upload uploadCallback={this.uploadCb} {...this.props} />
        </ModalContent>
        <ModalActions>
          <Button positive labelPosition='right' icon='upload' content='Upload' onClick={this.handleUploadClick} />
        </ModalActions>
      </Modal>
    )
  }

  uploadCb = (data) => {
    this.setState({
      uploadedFile: data
    })
  }

  render () {
    let { list, tags, records } = this.props
    let { fetchingEquations } = this.props.equations
    let data = list.data !== undefined ? list.data : []
    return (
      <div className='ui fluid container'>
        {this.renderUploadModal()}
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
                <TableCell>{value.audioUrl ? <a href={value.audioUrl} target='_blank'>{value.name}</a> : value.name}</TableCell>
                <TableCell>{value.note}</TableCell>
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
                    <Button basic color='green' onClick={e => this.handleUploadClick(value.id)}>Upload</Button>
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

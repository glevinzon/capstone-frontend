import React, { Component, PropTypes } from 'react'
import { Icon, Dimmer, Loader, Menu, Table, Label, Checkbox, Button, Modal, Header, Segment } from 'semantic-ui-react'
import Upload from './common/Upload'
import Alert from 'react-s-alert'
var empty = require('is-empty')
import EquationForm from './EquationForm'

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
      isLoading: false,
      isEdit: false,
      name: null,
      note: null,
      keywords: []
    }
  }

  componentWillReceiveProps (nextProps) {
    let { page, count } = this.state
    let {fetchingEquations, deletingEquation, deleteEquationSuccess, uploadingFile, fileUploadSuccess, fetchingEquationsSuccess} = nextProps.equations
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
      this.props.getEquations('paginate', page, count)
      Alert.success('Success', {
        position: 'top-right',
        effect: 'scale'
      })
    }

    if (!empty(equationCreationErrors)) {
      Alert.error(`<h4>Creation Failed!</h4><ul><li>${equationCreationErrors.message}</li></ul>`, {
        position: 'top-right',
        effect: 'scale',
        html: true,
        onShow: function () {
          this.props.getEquations('paginate', page, count)
        }
      })
    } else if (!empty(equationUpdateErrors)) {
      Alert.error(`<h4>Update Failed!</h4><ul><li>${equationUpdateErrors.message}</li></ul>`, {
        position: 'top-right',
        effect: 'scale',
        html: true,
        onShow: function () {
          this.props.getEquations('paginate', page, count)
        }
      })
    } else if (!empty(deleteEquationErrors)) {
      Alert.error(`<h4>Delete Failed!</h4><ul><li>${deleteEquationErrors.message}</li></ul>`, {
        position: 'top-right',
        effect: 'scale',
        html: true,
        onShow: function () {
          this.props.getEquations('paginate', page, count)
        }
      })
    } else if (!empty(uploadFileErrors)) {
      Alert.error(`<h4>Upload Failed!</h4><ul><li>${uploadFileErrors.message}</li></ul>`, {
        position: 'top-right',
        effect: 'scale',
        html: true,
        onShow: function () {
          this.props.getEquations('paginate', page, count)
        }
      })
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

  handleEditClick = (id, name, note) => {
    let { tags, records } = this.props

    var keywords = []
    records.map(record => {
      if (record.eqId === id) {
        tags.map(tag => {
          if (record.tagId === tag.id) {
            keywords.push(tag.name)
          }
        })
      }
    })

    console.log(keywords)
    this.setState({isEdit: true, id: id, name: name, note: note, keywords: keywords})
  }

  handleSubmitCb = () => {
    this.setState({isEdit: false, id: '', name: '', note: '', keywords: []})
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
        {this.state.isEdit ? <EquationForm id={this.state.id} name={this.state.name} note={this.state.note} keywords={this.state.keywords} tags={tags} username={'admin'} onSubmit={this.handleSubmitCb} {...this.props} /> : null}
        <Table color={'green'} celled>
          <Dimmer active={this.state.active}>
            <Loader size='large' content='Loading' />
          </Dimmer>
          <TableHeader>
            <TableRow>
              <TableHeaderCell></TableHeaderCell>
              <TableHeaderCell>Audio</TableHeaderCell>
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
                <TableCell><Segment raised>
                  <a href={value.audioUrl} target='_blank'><Label color={value.audioUrl ? 'blue' : 'red'} ribbon='left'>{value.audioUrl ? value.audioUrl.split('.').pop().toUpperCase() : 'EMPTY'}</Label></a>
              </Segment></TableCell>
                <TableCell>{value.name}</TableCell>
                <TableCell>{value.note}</TableCell>
                <TableCell>{records.map(record => {
                  let keywords = []
                  if (record.eqId === value.id) {
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
                    <Button positive onClick={e => this.handleEditClick(value.id, value.name, value.note)}>Edit</Button>
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

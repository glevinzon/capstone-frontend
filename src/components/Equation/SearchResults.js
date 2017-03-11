import React, { Component, PropTypes } from 'react'
import { Item, Message, Label, Button, Icon, Segment, Modal, Header, Dimmer, Loader } from 'semantic-ui-react'
var moment = require('moment')
import Upload from './common/Upload'
import Alert from 'react-s-alert'
var empty = require('is-empty')

const ModalContent = Modal.Content
const ModalActions = Modal.Actions
const ItemGroup = Item.Group
const ItemHeader = Item.Header
const ItemMeta = Item.Meta
const ItemDescription = Item.Description
const ItemExtra = Item.Extra
const ItemContent = Item.Content

class SearchResults extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: null,
      active: false,
      isUploadModalOpen: false,
      uploadedFile: [],
      fileName: '',
      isLoading: false
    }
  }

  componentWillReceiveProps (nextProps) {
    let {uploadingFile, fileUploadSuccess, fileUploaded, uploadFileErrors} = nextProps.equations
    if (uploadingFile) {
      this.setState({
        active: true,
        isUploadModalOpen: false
      })
    } else {
      this.setState({
        active: false
      })
    }
    if (fileUploadSuccess) {
      this.props.getEquations('paginate', 1, 15)
      Alert.success('Success', {
        position: 'top-right',
        effect: 'scale'
      })
    }
    if (!empty(uploadFileErrors)) {
      Alert.error(`<h4>Upload Failed!</h4><ul><li>${uploadFileErrors.message}</li></ul>`, {
        position: 'top-right',
        effect: 'scale',
        html: true,
        onShow: function () {
          this.props.getEquations('paginate', 1, 15)
        }
      })
    }
  }

  handleSearchByTag = (keyword) => {
    this.props.getEquationsBySearch('tag', keyword)
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
    let { equationsBySearch } = this.props.equations
    let { tags, records } = this.props
    if (equationsBySearch.length >= 1) {
      return (
        <ItemGroup>
        <Dimmer active={this.state.active}>
          <Loader>Uploading</Loader>
        </Dimmer>
        {this.renderUploadModal()}
          {equationsBySearch.map(result => {
            return (
              <Item>
              <Segment raised>
                <Label as='a' href={result.audioUrl} target='_blank' color={result.audioUrl ? 'blue' : 'red'} ribbon='right'>{result.audioUrl ? result.audioUrl.split('.').pop().toUpperCase() : 'EMPTY'}</Label>
              </Segment>
                <ItemContent style={{padding: '20px'}}>
                  <ItemHeader as='a'>
                  <Button onClick={e => this.handleUploadClick(result.id)} basic color='green' className='ui initial' animated>
                    <Button.Content visible>{result.name}</Button.Content>
                    <Button.Content hidden>
                      <Icon name='upload' />
                    </Button.Content>
                  </Button></ItemHeader>
                  <ItemMeta>{result.note}</ItemMeta>
                  <ItemDescription>
                    {records.map(record => {
                      if (record.eqId === result.id) {
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
                    })}
                  </ItemDescription>
                  <ItemExtra>Updated At: {moment(result.updated_at).format('llll')}</ItemExtra>
                </ItemContent>
              </Item>
            )
          })}
        </ItemGroup>
      )
    } else {
      return (
        <Message negative>
          <Message.Header>Sorry, can't find anything.</Message.Header>
          <p>No equation found.</p>
        </Message>
      )
    }
  }
}

SearchResults.propTypes = {
  equations: PropTypes.object,
  tags: PropTypes.array,
  records: PropTypes.array,
  getEquationsBySearch: PropTypes.func
}

export default SearchResults

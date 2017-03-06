import React, { Component, PropTypes } from 'react'
import Dropzone from 'react-dropzone'
import {Label, Grid, List, Segment} from 'semantic-ui-react'

const GridRow = Grid.Row
const GridColumn = Grid.Column
const ListItem = List.Item

class Upload extends Component {
  constructor (props) {
    super(props)
    this.state = {
      fileType: '',
      fileSize: null,
      fileName: ''
    }
  }

  onDrop = (acceptedFiles) => {
    this.props.uploadCallback(acceptedFiles)
    this.setState({
      fileSize: acceptedFiles[0].size,
      fileType: acceptedFiles[0].type,
      fileName: acceptedFiles[0].name
    })
  }

  render () {
    return (
      <Grid columns={2} divided>
        <GridRow>
          <GridColumn>
            <div style={{width: '100%'}}>
              <Dropzone onDrop={this.onDrop} multiple={false} >
                <div>Try dropping audio file here, or click to select file to upload.</div>
              </Dropzone>
            </div>
          </GridColumn>
          <GridColumn>
            <Segment padded>
              <Label attached='top'>DETAILS</Label>
              <List>
                <ListItem>{this.state.fileName}</ListItem>
                <ListItem>{this.state.fileType}</ListItem>
                <ListItem>{this.state.fileSize}</ListItem>
              </List>
            </Segment>
          </GridColumn>
        </GridRow>
      </Grid>

    )
  }
}

Upload.propTypes = {
  uploadCallback: PropTypes.func
}

export default Upload

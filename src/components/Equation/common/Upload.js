import React, { Component, PropTypes } from 'react'
import Dropzone from 'react-dropzone'

class Upload extends Component {
  onDrop = (acceptedFiles, rejectedFiles) => {
    console.log(acceptedFiles, rejectedFiles)
  }
  render () {
    return (
      <Dropzone onDrop={this.onDrop}>
        <div>Try dropping some files here, or click to select files to upload.</div>
      </Dropzone>
    )
  }
}

Upload.propTypes = {

}

export default Upload

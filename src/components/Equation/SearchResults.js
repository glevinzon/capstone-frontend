import React, { Component, PropTypes } from 'react'
import { Image, Item, Message } from 'semantic-ui-react'
var moment = require('moment')

const ItemGroup = Item.Group
const ItemImage = Item.Image
const ItemHeader = Item.Header
const ItemMeta = Item.Meta
const ItemDescription = Item.Description
const ItemExtra = Item.Extra
const ItemContent = Item.Content

class SearchResults extends Component {
  render () {
    let { equationsBySearch } = this.props.equations
    console.log(equationsBySearch)
    if (equationsBySearch.length >= 1) {
      return (
        <ItemGroup>
          {equationsBySearch.map(result => {
            return (
              <Item>
                <ItemImage size='tiny' src='http://semantic-ui.com/images/wireframe/image.png' />

                <ItemContent>
                  <ItemHeader as='a'>{result.name}</ItemHeader>
                  <ItemMeta>{result.note}</ItemMeta>
                  <ItemDescription>
                    <Image src='http://semantic-ui.com/images/wireframe/short-paragraph.png' />
                  </ItemDescription>
                  <ItemExtra>Created: {moment(result.created_at).format('llll')}</ItemExtra>
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
  equations: PropTypes.object
}

export default SearchResults

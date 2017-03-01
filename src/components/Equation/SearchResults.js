import React, { Component, PropTypes } from 'react'
import { Item, Message, Label } from 'semantic-ui-react'
var moment = require('moment')

const ItemGroup = Item.Group
const ItemImage = Item.Image
const ItemHeader = Item.Header
const ItemMeta = Item.Meta
const ItemDescription = Item.Description
const ItemExtra = Item.Extra
const ItemContent = Item.Content

class SearchResults extends Component {
  handleSearchByTag = (keyword) => {
    this.props.getEquationsBySearch('tag', keyword)
  }
  render () {
    let { equationsBySearch } = this.props.equations
    let { tags, records } = this.props
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
                  <ItemExtra>{moment(result.created_at).format('llll')}</ItemExtra>
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

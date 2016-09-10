import React, { Component } from 'react'

import './hits.css'

class Search extends Component {

  render () {
    return (
      <div className='hits__list'>
        <ul>
          {this.props.items.map(item => (
            <li key={item.id} title={item.id}>{item.displayName}</li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Search

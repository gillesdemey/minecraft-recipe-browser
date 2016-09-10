import React, { Component } from 'react'

class Search extends Component {

  render () {
    return (
      <div>
        <input
          type='text'
          name='search'
          placeholder={this.props.placeholder}
          onChange={e => this.props.onValue(e.target.value)}
        />
      </div>
    )
  }
}

export default Search

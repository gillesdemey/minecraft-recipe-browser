import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import data from './data'
import Search from './components/search'
import Workbench from './components/workbench'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = { hits: [], recipes: [] }
  }

  componentWillMount () {
    data.fetch()
  }

  search (query) {
    if (query.length <= 2) return
    console.info('searching for %s', query)

    const hits = data.findItemFuzzy(query)
    if (hits.length === 0) return

    this.setState({ hits: hits })
  }

  render () {
    return (
      <div className='App'>
        <img className='logo' src={logo} alt='Minecraft' />
        <Search
          wait={300}
          placeholder='What will you build next?'
          onValue={this.search.bind(this)}
        />
        <div className='search__results'>
          {this.state.hits.map(hit => (
            <div key={hit.itemID || hit.blockID}>
              <div className='header'>
                {hit.name}
              </div>
              <Workbench recipe={hit.recipe} result={hit} />
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default App

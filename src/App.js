import React, { Component } from 'react'
import { last } from 'lodash'
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

  search (query) {
    if (query.length <= 2) return
    console.info('searching for %s', query)

    const hits = data.findItemFuzzy(query)
    if (hits.length === 0) return

    const recipes = hits.reduce((acc, hit) => {
      const recipe = this.getRecipe(hit)
      if (recipe) acc.push(Object.assign(hit, { recipe: recipe }))
      return acc
    }, [])

    this.setState({ hits: recipes })
  }

  getRecipe (item) {
    const plans = data.findRecipeFromItem(item.id)
    let recipe = last(plans.recipesToDo)

    return recipe ? recipe.recipe : undefined
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
            <div>
              <div className='header'>
                {hit.displayName}
              </div>
              <Workbench key={hit.recipe.result.id} recipe={hit.recipe} />
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default App

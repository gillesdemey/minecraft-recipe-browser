import React, { Component } from 'react'
import { chunk } from 'lodash'

import './workbench.css'

const Row = ({ items }) => (
  <div className='row'>
    {items.map((item, i) => (
      <div key={i} className='invslot'>
        <InvSlot item={item} />
      </div>
    ))}
  </div>
)

const InvSlot = ({ item }) => {
  if (!item) return null

  const image = typeof item.image === 'string'
    ? item.image
    : item.image.prerendered
  return (
    <div>
      <img
        title={item.name}
        src={`https://assets.wurstmineberg.de/img/grid/${image}`}
        alt={item.name}
      />
    </div>
  )
}

class Workbench extends Component {

  render () {
    if (!this.props.recipe) return null

    // split recipe into chunks of 3 rows
    const recipe = chunk(this.props.recipe, 3)

    return (
      <div className='mcui craftingTable'>
        <div className='input'>
          {recipe.map((row, i) => (
            <Row key={i} items={row} />
          ))}
        </div>
        <div className='arrow'></div>
        <div className='output'>
          <div className='invslot invslot--large'>
            <InvSlot item={this.props.result} />
          </div>
        </div>
      </div>
    )
  }
}

export default Workbench

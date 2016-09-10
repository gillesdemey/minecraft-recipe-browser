import React, { Component } from 'react'
import data from '../data'

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
  return item ? (
    <div>
      <img
        title={item.displayName}
        src={data.findTexture(item.id)}
        alt={item.name}
      />
    </div>
  ) : null
}

class Workbench extends Component {

  render () {
    if (!this.props.recipe) return null

    return (
      <div className='mcui craftingTable'>
        <div className='input'>
          {this.props.recipe.inShape.map((row, i) => (
            <Row key={i} items={row} />
          ))}
        </div>
        <div className='arrow'></div>
        <div className='output'>
          <div className='invslot invslot--large'>
            <InvSlot item={this.props.recipe.result} />
          </div>
        </div>
      </div>
    )
  }
}

export default Workbench

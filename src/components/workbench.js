import React, { Component } from 'react'
import data from '../data'

import './workbench.css'

const Row = ({ items }) => (
  <div className='row'>
    {items.map((item, i) => (
      <div key={i} className='invslot'>
        <InvSlot id={item.id} />
      </div>
    ))}
  </div>
)

const InvSlot = ({ id }) => {
  const item = data.findItemById(id)
  return item ? (
    <div>
      <img
        title={item.displayName}
        src={data.findTexture(id)}
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
            <InvSlot id={this.props.recipe.result.id} />
          </div>
        </div>
      </div>
    )
  }
}

export default Workbench

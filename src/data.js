import data from 'minecraft-data'
import { craft } from 'minecraft-crafter'
import assets from './texture_content.1.9.json'

import Fuse from 'fuse.js'
import { values, merge, find } from 'lodash'

const dataset = data('1.10')

// concat items with blocks
const itemsAndBlocks = values(Object.assign(dataset.itemsByName, dataset.blocksByName))
const fuse = new Fuse(itemsAndBlocks, {
  keys: ['displayName'],
  threshold: 0.15 // magic number
})

const findItemFuzzy = (query) => {
  return fuse.search(query)
}

const findRecipeFromItem = (itemId) => {
  const plans = craft({ id: itemId, count: 1 })
  // fill all empty recipe row with null
  const empty = [
    [{ id: -1 }, { id: -1 }, { id: -1 }],
    [{ id: -1 }, { id: -1 }, { id: -1 }],
    [{ id: -1 }, { id: -1 }, { id: -1 }]
  ]
  plans.recipesToDo = plans.recipesToDo.map(recipe => {
    recipe.recipe.inShape = merge(empty, recipe.recipe.inShape)
    return recipe
  })
  return plans
}

const findItemById = (id) => {
  return Object.assign(dataset.items, dataset.blocks)[id]
}

const findTexture = (id) => {
  let name
  try {
    name = findItemById(id).name
  } catch (err) { return '' }
  return find(assets, { 'name': name }).texture
}

export default {
  findItemFuzzy,
  findItemById,
  findRecipeFromItem,
  findTexture
}

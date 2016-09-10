import data from 'minecraft-data'
import assets from './texture_content.1.9.json'

import Fuse from 'fuse.js'
import { map, merge, find, last, compact } from 'lodash'

// the only way to get accurate recipes is to merge multiple versions
const dataset = data('1.10')

// expand recipes with item data
var recipes = map(dataset.recipes, (recipe, id) => {
  recipe = last(recipe) // only last recipe is relevant

  return Object.assign(dataset.findItemOrBlockById(id), {
    recipe: fillRecipeShape(expandRecipe(recipe))
  })
})
recipes = compact(recipes)

const fuse = new Fuse(recipes, {
  keys: ['displayName'],
  threshold: 0.15 // magic number
})

function findItemFuzzy (query) {
  return fuse.search(query)
}

// fill all empty recipe row with null
function fillRecipeShape (recipe) {
  const empty = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]

  return Object.assign(recipe, {
    inShape: merge(empty, recipe.inShape)
  })
}

// expand recipe with metadata about each individual ingredient
function expandRecipe (recipe) {
  console.info('expanding recipe', recipe)

  // treat ingredients like shaped recipes
  if (recipe.hasOwnProperty('ingredients')) {
    recipe.inShape = [recipe.ingredients]
  }

  if (!recipe.hasOwnProperty('inShape')) return recipe

  recipe.inShape = recipe.inShape.map(row => {
    return row.map(item => {
      if (!item) return item
      if (typeof item === 'number') return dataset.findItemOrBlockById(item)
      return dataset.findItemOrBlockById(item.id)
    })
  })
  recipe.result = dataset.findItemOrBlockById(recipe.result.id)

  return recipe
}

function findItemById (id) {
  return Object.assign(dataset.items, dataset.blocks)[id]
}

function findTexture (id) {
  let name
  try {
    name = findItemById(id).name
  } catch (err) { return '' }
  const asset = find(assets, { 'name': name })
  return asset ? asset.texture : ''
}

export default {
  findItemFuzzy,
  findItemById,
  findTexture
}

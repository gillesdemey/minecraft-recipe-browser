import Fuse from 'fuse.js'
import pify from 'pify'
import xhr from 'xhr'
import { map, reduce, filter, values, some } from 'lodash'

const request = pify(xhr)

let dataset, fuse

function fetch () {
  return request('https://api.wurstmineberg.de/v2/minecraft/items/all.json')
  .then(resp => {
    if (resp.statusCode >= 400) throw new Error(resp.body)

    let data
    try {
      data = JSON.parse(resp.body).minecraft
    } catch (ex) { throw ex }

    dataset = data
    return data
  })
  .then(filterCraftables)
  .then(expandRecipes)
  .then(loadFuse)
  .catch(err => { throw err })
}

// reject non-craftable items
function filterCraftables (dataset) {
  return filter(dataset, (item, name) => {
    return item.obtaining && some(item.obtaining, method => {
      return method.type === ('craftingShaped') || method.type === 'craftingShapeless'
    })
  })
}

// expand recipes with item data
function expandRecipes (dataset) {
  return map(dataset, (item, name) => {
    const recipe = reduce(item.obtaining, (acc, method) => {
      if (method.hasOwnProperty('recipe')) acc = map(method.recipe, expandRecipeItem)
      return acc
    }, {})
    item.recipe = recipe
    return item
  })
}

// { damage: 4, id: "minecraft:planks" }
// or
// "minecraft:sticks"
function expandRecipeItem (item) {
  if (!item) return null
  const name = item.id
    ? item.id.replace('minecraft:', '')
    : item.replace('minecraft:', '')
  return dataset[name]
}

function loadFuse (dataset) {
  fuse = new Fuse(values(dataset), {
    keys: ['name'],
    threshold: 0.15 // magic number
  })
}

function findItemFuzzy (query) {
  return fuse.search(query)
}

export default {
  fetch,
  findItemFuzzy
}

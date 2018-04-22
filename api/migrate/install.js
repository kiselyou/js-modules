import { mgDB } from '../db/mongo'
import { map } from './map'

/**
 *
 * @returns {void}
 */
async function install(entities) {
  for (let entity of entities) {
    const collectionName = entity.constructor.name
    const collection = await mgDB(collectionName)
    collection.updateOne(
      { id: entity.id },
      { $set: entity },
      { upsert: true },
      async (err, res) => {
        if (err === null) {
          console.log(`Created record in collection "${collectionName}"`)
        } else {
          console.log(`Can not create collection "${collectionName}"`, entity, err)
        }
      }
    )
  }
}

/**
 *
 * @returns {void}
 */
async function start() {
  for (let entities of map) {
    await install(entities)
  }
}

start()
import { mgDB } from '../db/mongo'
import { map } from './map'

const statistic = {}

/**
 *
 * @returns {void}
 */
async function install(entities) {
  for (let entity of entities) {
    const collectionName = entity.constructor.name

    if (!statistic.hasOwnProperty(collectionName)) {
      statistic[collectionName] = 0
    }

    const collection = await mgDB(collectionName)
    await collection.updateOne(
      { id: entity.id },
      { $set: entity },
      { upsert: true },
      async (err, res) => {
        if (err === null) {
          statistic[collectionName]++
        } else {
          console.log(`Can not create collection "${collectionName}"`, entity, err)
        }
      }
    )
  }
  console.log(statistic)
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
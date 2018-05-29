import { mgDB } from '../db/mongo'
import { sectorSun } from './f8a54ce6-d80d-4a36-b285-f12351b0a8ba'

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

    mgDB((db, closeConnect) => {
      const collection = db.collection(collectionName)
      collection
        .updateOne({ id: entity.id }, { $set: entity }, { upsert: true })
        .catch(() => {
          console.log(`Can not create collection "${collectionName}"`, entity, err)
        })
        .then(() => {
          statistic[collectionName]++
        })
        .finally(closeConnect)
    })
  }
}

/**
 *
 * @returns {void}
 */
async function start() {
  for (let entities of sectorSun) {
    await install(entities)
  }
}

start()
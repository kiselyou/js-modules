import { mgDB } from './db/mongo'
import { install } from './../migration/install'

/**
 *
 * @param {string} collectionName
 * @param {Array} data
 * @returns {void}
 */
async function migrate(collectionName, data) {
  const collection = await mgDB(collectionName)
  collection.insertOne(data, (err, res) => {
    if (err === null) {
      console.log(`Created record in collection "${collectionName}"`)
    } else {
      console.log(`Can not create collection "${collectionName}"`, data)
    }
  })
}

for (let collectionData of install) {
  for (let entity of collectionData) {
    migrate(entity.constructor.name, entity)
  }
}

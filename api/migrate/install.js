import { mgDBAsync } from '../db/mongo'
import { sector, relationship } from './f8a54ce6-d80d-4a36-b285-f12351b0a8ba'

/**
 *
 * @param {Promise<Db>} db
 * @param {Array.<Object>} entities
 * @returns {Promise<void>}
 */
async function install(db, entities) {
  for (let entity of entities) {
    await createOrUpdate(db, entity)
  }
}

/**
 *
 * @param {Promise<Db>} db
 * @param {Array.<Object>} entities
 * @returns {Promise<void>}
 */
async function installRelationship(db, entities) {
  for (let entity of entities) {
    switch (entity.constructor.name) {
      case 'PlayerHasSpaceship':
        const collection = db.collection('Spaceship')
        const spaceship = await collection.findOne({ id: entity.spaceshipId })
        entity.setSpaceship(spaceship)
        break
    }
    await createOrUpdate(db, entity)
  }
}

/**
 *
 * @param {Promise<Db>} db
 * @param {Object} entity
 * @returns {Promise<void>}
 */
async function createOrUpdate(db, entity) {
  const collectionName = entity.constructor.name
  const collection = db.collection(collectionName)
  await collection.updateOne({ id: entity.id }, { $set: entity }, { upsert: true })
}

/**
 *
 * @returns {void}
 */
async function start() {
  const db = await mgDBAsync()
  for (let entities of sector) {
    await install(db, entities)
  }

  for (let entities of relationship) {
    await installRelationship(db, entities)
  }
  console.log('==========MIGRATION FINISHED SUCCESSFULLY=========')
}

start()
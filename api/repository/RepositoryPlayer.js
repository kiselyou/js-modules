import uuidV4 from 'uuid/v4'
import * as core from '../core'
import { getCatalog } from './RepositoryCatalog'
import Slot from './../../entity/particles-spaceship/Slot'
import Player from './../../entity/particles-sector/Player'
import Spaceship from './../../entity/particles-spaceship/Spaceship'
import PlayerHasParticle from './../../entity/dependence/PlayerHasParticle'

const defaultRaceId = '2389afd5-5635-4b81-8a2c-13aec5955240'
const defaultSectorId = 'f8a54ce6-d80d-4a36-b285-f12351b0a8ba'

/**
 *
 * @param {User} user
 * @param {string} spaceshipId
 * @returns {Promise<void>}
 */
export const createAndInsertPlayer = async function (user, spaceshipId) {
  const range = 3000
  const catalog = await getCatalog()

  const player = new Player()
    .setUserId(user.id)
    .setSpaceshipId(spaceshipId)
    .setRaceId(defaultRaceId)
    .setSectorId(defaultSectorId)
    .setPosition(core.randInt( - range, range), 0, core.randInt( - range, range))

  const db = await core.mgDBAsync()
  await insertPlayer(db, player, catalog)
}

/**
 *
 * @param {Db} db
 * @param {Player} player
 * @param {Catalog} catalog
 * @returns {Promise<void>}
 */
export const insertPlayer = async function (db, player, catalog) {
  const catalogSpaceship = catalog.getSpaceshipById(player.spaceshipId)
  const catalogId = catalogSpaceship.id
  catalogSpaceship.rebuildId().setCatalogId(catalogId)

  player.setSpaceshipId(catalogSpaceship.id)

  for (const slot of catalogSpaceship.slot) {
    slot.rebuildId()
    if (slot.particleId) {
      await insertPlayerParticle(db, player.id, slot, catalog)
    }
  }

  const playerHasParticle = new PlayerHasParticle()
    .setPlayerId(player.id)
    .setParticle(catalogSpaceship)

  const collectionPlayer = await db.collection('Player');
  await collectionPlayer.updateOne({ id: player.id }, { $set: player }, { upsert: true })

  const collectionSpaceship = await db.collection('PlayerHasParticle');
  await collectionSpaceship.updateOne({ id: playerHasParticle.id }, { $set: playerHasParticle }, { upsert: true })
}

/**
 *
 * @param {Db} db
 * @param {string} playerId
 * @param {Object} slot
 * @param {Catalog} catalog
 * @returns {Promise<void>}
 */
async function insertPlayerParticle(db, playerId, slot, catalog) {
  let catalogParticle = null
  switch (slot.type) {
    case Slot.TYPE_ENGINE:
      catalogParticle = catalog.getEngineById(slot.particleId)
      break;
    case Slot.TYPE_GUN:
      catalogParticle = catalog.getGunById(slot.particleId)
      break
    case Slot.TYPE_SHELL:
      catalogParticle = catalog.getShellById(slot.particleId)
      break
    case Slot.TYPE_ENERGY:
      catalogParticle = catalog.getEnergyById(slot.particleId)
      break
    case Slot.TYPE_ARMOR:
      catalogParticle = catalog.getArmorById(slot.particleId)
      break
  }

  if (catalogParticle) {
    const catalogId = catalogParticle.id
    catalogParticle.rebuildId().setCatalogId(catalogId)

    const entity = new PlayerHasParticle()
    entity
      .setSlotId(slot.id)
      .setPlayerId(playerId)
      .setParticle(catalogParticle)

    const collection = await db.collection('PlayerHasParticle')
    await collection.updateOne({ playerId, slotId: slot.id }, { $set: entity }, { upsert: true })
  } else {
    throw new Error('Couldn\'t find particle in Catalog')
  }
}

/**
 *
 * @param {Db} db
 * @param {Object} [where]
 * @return {Promise<Array>}
 */
export const findPlayers = async function (db, where = {}) {
  const collection = await db.collection('Player')
  return await collection.find(where).toArray()
}

/**
 *
 * @param {Db} db
 * @param {Object} where
 * @return {Promise<?Object>}
 */
export const findPlayer = async function (db, where) {
  const collection = await db.collection('Player')
  return await collection.findOne(where)
}

/**
 *
 * @param {Db} db
 * @param {Object} where
 * @return {Promise<void>}
 */
export const deletePlayer = async function (db, where) {
  const collection = await db.createCollection('Player')
  await collection.deleteMany(where)
}

/**
 *
 * @param {Db} db
 * @param {Object} where
 * @return {Promise<Array>}
 */
export const findPlayerParticles = async function (db, where) {
  const collection = await db.collection('PlayerHasParticle')
  return await collection.find(where).toArray()
}

/**
 *
 * @param {Db} db
 * @param {Object} where
 * @return {Promise<?Object>}
 */
export const findPlayerParticle = async function (db, where) {
  const collection = await db.collection('PlayerHasParticle')
  return await collection.findOne(where)
}

/**
 *
 * @param {Db} db
 * @param {Object} where
 * @return {Promise<void>}
 */
export const deletePlayerParticles = async function (db, where) {
  const collection = await db.createCollection('PlayerHasParticle')
  await collection.deleteMany(where)
}
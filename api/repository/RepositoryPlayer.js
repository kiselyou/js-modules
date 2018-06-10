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
 * @param {Player} entity
 * @param {Catalog} catalog
 * @returns {Promise<void>}
 */
export const insertPlayer = async function (db, entity, catalog) {
  const spaceshipData = catalog.getSpaceShipById(entity.spaceshipId)
  if (spaceshipData) {
    const spaceship = new Spaceship().copy(spaceshipData).rebuildId()
    entity.setSpaceshipId(spaceship.id)

    for (const slot of spaceship.slot) {
      slot.rebuildId()
      await insertParticle(db, entity.id, slot, catalog)
    }

    const playerHasParticle = new PlayerHasParticle()
      .setPlayerId(entity.id)
      .setParticle(spaceship)

    const collectionPlayer = await db.collection('Player');
    await collectionPlayer.updateOne({ id: entity.id }, { $set: entity }, { upsert: true })

    const collectionSpaceship = await db.collection('PlayerHasParticle');
    await collectionSpaceship.updateOne({ id: playerHasParticle.id }, { $set: playerHasParticle }, { upsert: true })
  }
}

/**
 *
 * @param {Db} db
 * @param {string} playerId
 * @param {Object} slot
 * @param {Catalog} catalog
 * @returns {Promise<void>}
 */
async function insertParticle(db, playerId, slot, catalog) {
  let particle = null
  switch (slot.type) {
    case Slot.TYPE_ENGINE:
      particle = catalog.getEngineById(slot.particleId)
      break;
    case Slot.TYPE_GUN:
      particle = catalog.getGunById(slot.particleId)
      break
  }

  if (particle) {
    particle.id = uuidV4()

    const entity = new PlayerHasParticle()
    entity
      .setSlotId(slot.id)
      .setPlayerId(playerId)
      .setParticle(particle)

    const collection = await db.collection('PlayerHasParticle')
    await collection.updateOne({ playerId, slotId: slot.id }, { $set: entity }, { upsert: true })
  }
}
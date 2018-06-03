import uuidV4 from 'uuid/v4'

import Slot from './../../entity/particles-spaceship/Slot'
import Player from './../../entity/particles-sector/Player'
import Spaceship from './../../entity/particles-spaceship/Spaceship'
import PlayerHasParticle from './../../entity/dependence/PlayerHasParticle'

export const players = [
  new Player()
    .setPosition(300, 0, 300)
    .setName('Валера')
    .setId('09839694-28d3-4504-9dc9-1cd3b6a539d7')
    .setRaceId('2389afd5-5635-4b81-8a2c-13aec5955240')
    .setSectorId('f8a54ce6-d80d-4a36-b285-f12351b0a8ba')
    .setSpaceshipId('842d5a80-6880-4047-b10b-a69850cf577b'),
]

/**
 *
 * @param {Db} db
 * @param {Catalog} catalog
 * @returns {Promise<void>}
 */
export const installPlayer = async function (db, catalog) {
  for (const entity of players) {
    const spaceshipData = catalog.getSpaceShipById(entity.spaceshipId)
    if (spaceshipData) {
      const spaceship = new Spaceship().copy(spaceshipData, ['id'])
      entity.setSpaceshipId(spaceship.id)

      for (const slot of spaceship.slot) {
        slot.id = uuidV4()
        await installParticle(db, entity.id, slot, catalog)
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
}

/**
 *
 * @param {Db} db
 * @param {string} playerId
 * @param {Object} slot
 * @param {Catalog} catalog
 * @returns {Promise<void>}
 */
async function installParticle(db, playerId, slot, catalog) {
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
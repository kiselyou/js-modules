import Asteroid from './../../entity/particles-sector/Asteroid'
import SectorHasParticle from './../../entity/dependence/SectorHasParticle'
import * as CONST from './../../app/constants'

export const asteroid = [
  new Asteroid()
    .setDistanceToCenter(800)
    .setAngleToCenter(Math.PI / 9)
    .setModelKey(CONST.KEY_ASTEROID_1)
    .setId('78969982-e002-412e-be23-279b4c020668')
    .setName('Asteroid-1'),
  new Asteroid()
    .setDistanceToCenter(800)
    .setAngleToCenter(Math.PI / 7)
    .setModelKey(CONST.KEY_ASTEROID_2)
    .setId('3df7592b-56be-4d6c-abc5-c856c774d676')
    .setName('Asteroid-2'),
  new Asteroid()
    .setDistanceToCenter(800)
    .setAngleToCenter(Math.PI / -5)
    .setModelKey(CONST.KEY_ASTEROID_3)
    .setId('bbec590e-90cc-4195-8540-a7ab6a2d3ba4')
    .setName('Asteroid-3'),
  new Asteroid()
    .setDistanceToCenter(800)
    .setAngleToCenter(Math.PI / 3)
    .setModelKey(CONST.KEY_ASTEROID_1)
    .setId('de8a8c60-59cf-4bcb-8b76-1e11e99eb0c1')
    .setName('Asteroid-4'),
  new Asteroid()
    .setDistanceToCenter(800)
    .setAngleToCenter(Math.PI / -2)
    .setModelKey(CONST.KEY_ASTEROID_2)
    .setId('5be25f0c-aeab-4a2a-b308-113ae2721258')
    .setName('Asteroid-5'),
  new Asteroid()
    .setDistanceToCenter(800)
    .setAngleToCenter(Math.PI / -3)
    .setModelKey(CONST.KEY_ASTEROID_3)
    .setId('0c0ce86d-7d47-42fc-adba-b14f4de8464d')
    .setName('Asteroid-6'),
]

/**
 *
 * @param {Db} db
 * @param {Catalog} catalog
 * @param {string} sectorId
 * @returns {Promise<void>}
 */
export async function installAsteroid(db, catalog, sectorId) {
  for (let entity of asteroid) {
    const particle = new Asteroid().copy(entity).rebuildId()
    const data = new SectorHasParticle().setSectorId(sectorId).setParticle(particle)
    await createOrUpdate(db, data)
  }
}

/**
 *
 * @param {Db} db
 * @param {SectorHasParticle} data
 * @returns {Promise<void>}
 */
async function createOrUpdate(db, data) {
  const collection = db.collection('SectorHasParticle')
  await collection.updateOne({ id: data.id }, { $set: data }, { upsert: true })
}
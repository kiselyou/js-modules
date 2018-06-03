import Station from './../../entity/particles-sector/Station'
import SectorHasParticle from './../../entity/dependence/SectorHasParticle'
import * as CONST from './../../app/constants'

export const station = [
  new Station()
    .setDistanceToCenter(400)
    .setAngleToCenter(Math.PI / 4)
    .setModelKey(CONST.KEY_STATION_2)
    .setName('Солнечная станция')
    .setId('7b857a0d-b128-42cf-9471-d1053a100a2c'),
  new Station()
    .setDistanceToCenter(600)
    .setAngleToCenter(Math.PI / 4)
    .setModelKey(CONST.KEY_STATION_2)
    .setName('Научная станция')
    .setId('47295f7e-2645-450a-8036-1445ee500a6b'),
  new Station()
    .setDistanceToCenter(800)
    .setAngleToCenter(Math.PI / 4)
    .setModelKey(CONST.KEY_STATION_2)
    .setName('Промышленная станция')
    .setId('8cfa0370-d177-45cb-adfa-bac1d0581d0a')
]

/**
 *
 * @param {Db} db
 * @param {Catalog} catalog
 * @param {string} sectorId
 * @returns {Promise<void>}
 */
export async function installStation(db, catalog, sectorId) {
  for (let entity of station) {
    const particle = new Station().copy(entity, ['id'])
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
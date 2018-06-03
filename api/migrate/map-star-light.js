import SectorHasParticle from './../../entity/dependence/SectorHasParticle'
import StarLight from './../../entity/particles-sector/StarLight'
import * as CONST from './../../app/constants'

export const starlight = [
  new StarLight()
    .setId('3879859e-d2cb-473d-b14c-e39078e0d2eb')
    .setTextureKey(CONST.KEY_LIGHT_CONTROLS_1)
    .setPosition(0, -1550, -1200),
  new StarLight()
    .setId('43105511-e59a-44b1-b435-bc8acb95a517')
    .setTextureKey(CONST.KEY_LIGHT_CONTROLS_11)
    .setPosition(2400, 0, -2200),
  new StarLight()
    .setId('4e39aae0-eea9-46a4-a55b-0c9001ce93e9')
    .setTextureKey(CONST.KEY_LIGHT_CONTROLS_14)
    .setRotationSpeed(0.003)
    .setPosition(-1250, -100, 100),
  new StarLight()
    .setId('9a7dc8e2-4fc5-4dad-a0b7-8f6f3ae9857b')
    .setTextureKey(CONST.KEY_LIGHT_CONTROLS_14)
    .setRotationSpeed(-0.004)
    .setPosition(-1200, 100, -500),
  new StarLight()
    .setId('4d30db52-a3fb-4755-b25b-c9dcdf534562')
    .setTextureKey(CONST.KEY_LIGHT_CONTROLS_5)
    .setPosition(1000, -580, -1600),
  new StarLight()
    .setId('88895e42-03ac-48ed-a0b4-3dbd5c7e75fc')
    .setTextureKey(CONST.KEY_LIGHT_CONTROLS_6)
    .setPosition(2200, 300, 100),
  new StarLight()
    .setId('5d633ccc-a8e6-4937-8c9e-6035c425cb56')
    .setTextureKey(CONST.KEY_LIGHT_CONTROLS_9)
    .setRotationSpeed(0.005)
    .setPosition(900, 100, 1600),
  new StarLight()
    .setId('b83a4ac9-cf2c-426c-88b5-325d0c566011')
    .setTextureKey(CONST.KEY_LIGHT_CONTROLS_13)
    .setPosition(-2400, 600, -2400),
  new StarLight()
    .setId('52fb2dd9-d247-4c90-b110-bedbc9f9b281')
    .setTextureKey(CONST.KEY_LIGHT_CONTROLS_14)
    .setRotationSpeed(-0.005)
    .setPosition(200, -600, -200),
  new StarLight()
    .setId('61093ac1-f40c-41b0-9681-c9c9f2599c6e')
    .setTextureKey(CONST.KEY_LIGHT_CONTROLS_15)
    .setPosition(-2100, -1800, 1900)
]

/**
 *
 * @param {Db} db
 * @param {Catalog} catalog
 * @param {string} sectorId
 * @returns {Promise<void>}
 */
export async function installStarlight(db, catalog, sectorId) {
  for (let entity of starlight) {
    const particle = new StarLight().copy(entity, ['id'])
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
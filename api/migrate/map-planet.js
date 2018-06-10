import * as CONST from './../../app/constants'
import Planet from './../../entity/particles-sector/Planet'
import SectorHasParticle from './../../entity/dependence/SectorHasParticle'

/**
 *
 * @type {Array.<Planet>}
 */
export const planet = [
  new Planet()
    .setRadius(30.39)
    .setTextureMapKey(CONST.KEY_PLANET_SUN_MAP, 0x000000)
    .setGlowInside({ color: 0x625731, coefficient: 1, power: 2.0, length: 0.02 })
    .setGlowOutside({ color: 0x625731, coefficient: 0.1, power: 2.5, length: 0.5 })
    .setId('8beee4b1-73af-4909-9515-3062adf3fce6')
    .setName('Sun'),
  new Planet()
    .setSpeedMove(0.0002)
    .setDistanceToCenter(400)
    .setRadius(6.371)
    .setTextureMapKey(CONST.KEY_PLANET_EARTH_MAP, 0x4D5A62)
    .setGlowInside({ color: 0xA0D1E6, coefficient: 1.2, power: 1.9, length: 0.06 })
    .setGlowOutside({ color: 0xA0D1E6, coefficient: 0.01, power: 1.6, length: 0.6 })
    .setParentId('8beee4b1-73af-4909-9515-3062adf3fce6')
    .setId('d3c7c591-0fe9-4c76-9ffd-63741131060d')
    .setName('Земля'),
  new Planet()
    .setSpeedMove(0.002)
    .setDistanceToCenter(50)
    .setRadius(1.737)
    .setTextureMapKey(CONST.KEY_PLANET_MOON_MAP, 0x000000)
    .setGlowInside({ color: 0xCCCCCC, coefficient: 1, power: 2.0, length: 0.1 })
    .setGlowOutside({ color: 0xFFFFFF, coefficient: 0.2, power: 2.5, length: 0.5 })
    .setParentId('d3c7c591-0fe9-4c76-9ffd-63741131060d')
    .setId('ccc3fe37-1b8c-489c-bbbb-0b3e04783a71')
    .setName('Луна'),
  new Planet()
    .setSpeedMove(0.0004)
    .setDistanceToCenter(1000)
    .setRadius(3.39)
    .setTextureMapKey(CONST.KEY_PLANET_MARS_MAP, 0x000000)
    .setGlowInside({ color: 0x625731, coefficient: 1, power: 2.0, length: 0.02 })
    .setGlowOutside({ color: 0x625731, coefficient: 0.1, power: 2.5, length: 0.5 })
    .setParentId('8beee4b1-73af-4909-9515-3062adf3fce6')
    .setId('ccc3fe37-1b8c-489c-bbbb-0b3e04784d72')
    .setName('Марс'),
  new Planet()
    .setSpeedMove(0.0004)
    .setDistanceToCenter(1200)
    .setRadius(3.39)
    .setTextureMapKey(CONST.KEY_PLANET_CERES_MAP, 0x000000)
    .setGlowInside({ color: 0x625731, coefficient: 1, power: 2.0, length: 0.02 })
    .setGlowOutside({ color: 0x625731, coefficient: 0.1, power: 2.5, length: 0.5 })
    .setParentId('8beee4b1-73af-4909-9515-3062adf3fce6')
    .setId('47e4fe7c-3d17-4e39-8d11-e22a0f2c3b58')
    .setName('Ceres'),
  new Planet()
    .setSpeedMove(0.0004)
    .setDistanceToCenter(1350)
    .setRadius(3.39)
    .setTextureMapKey(CONST.KEY_PLANET_ERIS_MAP, 0x000000)
    .setGlowInside({ color: 0x625731, coefficient: 1, power: 2.0, length: 0.02 })
    .setGlowOutside({ color: 0x625731, coefficient: 0.1, power: 2.5, length: 0.5 })
    .setParentId('8beee4b1-73af-4909-9515-3062adf3fce6')
    .setId('c09575e9-b6c8-4944-8f69-43e5e89e6e12')
    .setName('Eris'),
  new Planet()
    .setSpeedMove(0.0004)
    .setDistanceToCenter(1650)
    .setRadius(3.39)
    .setTextureMapKey(CONST.KEY_PLANET_HAUMEA_MAP, 0x000000)
    .setGlowInside({ color: 0x625731, coefficient: 1, power: 2.0, length: 0.02 })
    .setGlowOutside({ color: 0x625731, coefficient: 0.1, power: 2.5, length: 0.5 })
    .setParentId('8beee4b1-73af-4909-9515-3062adf3fce6')
    .setId('5ef86d7b-cd7b-4fae-93c4-f44cd6a95f14')
    .setName('Haumea'),
  new Planet()
    .setSpeedMove(0.0004)
    .setDistanceToCenter(1850)
    .setRadius(3.39)
    .setTextureMapKey(CONST.KEY_PLANET_JUPITER_MAP, 0x000000)
    .setGlowInside({ color: 0x625731, coefficient: 1, power: 2.0, length: 0.02 })
    .setGlowOutside({ color: 0x625731, coefficient: 0.1, power: 2.5, length: 0.5 })
    .setParentId('8beee4b1-73af-4909-9515-3062adf3fce6')
    .setId('daa15781-cca1-437c-b3f4-f160cd8ab210')
    .setName('Jupiter'),
  new Planet()
    .setSpeedMove(0.0004)
    .setDistanceToCenter(2050)
    .setRadius(3.39)
    .setTextureMapKey(CONST.KEY_PLANET_MAKEMAKE_MAP, 0x000000)
    .setGlowInside({ color: 0x625731, coefficient: 1, power: 2.0, length: 0.02 })
    .setGlowOutside({ color: 0x625731, coefficient: 0.1, power: 2.5, length: 0.5 })
    .setParentId('8beee4b1-73af-4909-9515-3062adf3fce6')
    .setId('9e66d7f0-2ab5-4fec-ae48-dc8e5a2290ea')
    .setName('Makemake'),
  new Planet()
    .setSpeedMove(0.0004)
    .setDistanceToCenter(2050)
    .setRadius(3.39)
    .setTextureMapKey(CONST.KEY_PLANET_MERCURY_MAP, 0x000000)
    .setGlowInside({ color: 0x625731, coefficient: 1, power: 2.0, length: 0.02 })
    .setGlowOutside({ color: 0x625731, coefficient: 0.1, power: 2.5, length: 0.5 })
    .setParentId('8beee4b1-73af-4909-9515-3062adf3fce6')
    .setId('31f311b6-4c0f-4fc9-9a2b-5e30c34f4f8a')
    .setName('Mercury'),
  new Planet()
    .setSpeedMove(0.0004)
    .setDistanceToCenter(2250)
    .setRadius(3.39)
    .setTextureMapKey(CONST.KEY_PLANET_NEPTUN_MAP, 0x000000)
    .setGlowInside({ color: 0x625731, coefficient: 1, power: 2.0, length: 0.02 })
    .setGlowOutside({ color: 0x625731, coefficient: 0.1, power: 2.5, length: 0.5 })
    .setParentId('8beee4b1-73af-4909-9515-3062adf3fce6')
    .setId('96cdf3ca-4914-469c-a9fc-69b8949995a8')
    .setName('Neptun'),
  new Planet()
    .setSpeedMove(0.0004)
    .setDistanceToCenter(2450)
    .setRadius(3.39)
    .setTextureMapKey(CONST.KEY_PLANET_SATURN_MAP, 0x000000)
    .setGlowInside({ color: 0x625731, coefficient: 1, power: 2.0, length: 0.02 })
    .setGlowOutside({ color: 0x625731, coefficient: 0.1, power: 2.5, length: 0.5 })
    .setParentId('8beee4b1-73af-4909-9515-3062adf3fce6')
    .setId('8b8bd117-5d1c-481a-874f-3f02c9a942cc')
    .setName('Saturn'),
  new Planet()
    .setSpeedMove(0.0004)
    .setDistanceToCenter(2850)
    .setRadius(3.39)
    .setTextureMapKey(CONST.KEY_PLANET_URANUS_MAP, 0x000000)
    .setGlowInside({ color: 0x625731, coefficient: 1, power: 2.0, length: 0.02 })
    .setGlowOutside({ color: 0x625731, coefficient: 0.1, power: 2.5, length: 0.5 })
    .setParentId('8beee4b1-73af-4909-9515-3062adf3fce6')
    .setId('45dd6bf4-3f22-4852-816a-4d0fcfadd61b')
    .setName('Uranus'),
  new Planet()
    .setSpeedMove(0.0004)
    .setDistanceToCenter(3050)
    .setRadius(3.39)
    .setTextureMapKey(CONST.KEY_PLANET_VENUS_MAP, 0x000000)
    .setGlowInside({ color: 0x625731, coefficient: 1, power: 2.0, length: 0.02 })
    .setGlowOutside({ color: 0x625731, coefficient: 0.1, power: 2.5, length: 0.5 })
    .setParentId('8beee4b1-73af-4909-9515-3062adf3fce6')
    .setId('be2ec1ca-e957-4dc5-af39-0125d8909fbb')
    .setName('Venus'),
]

/**
 *
 * @param {Db} db
 * @param {Catalog} catalog
 * @param {string} sectorId
 * @returns {Promise<void>}
 */
export async function installPlanet(db, catalog, sectorId) {
  /**
   * Example: {'this is original particle ID from catalog': 'this is new ID'}
   *
   * @type {Object}
   */
  const rememberParticleId = {}
  const sectorHasPlanet = []
  for (let entity of planet) {
    const particle = new Planet().copy(entity).rebuildId()
    rememberParticleId[entity.id] = particle.id
    sectorHasPlanet.push(
      new SectorHasParticle().setSectorId(sectorId).setParticle(particle)
    )
  }

  for (const entity of sectorHasPlanet) {
    const parentId = entity.particle.parentId
    if (rememberParticleId.hasOwnProperty(parentId)) {
      entity.particle.parentId = rememberParticleId[parentId]
    }
    await createOrUpdate(db, entity)
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
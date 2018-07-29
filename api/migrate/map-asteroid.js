import Asteroid from './../../entity/particles-sector/Asteroid'
import SectorHasParticle from './../../entity/dependence/SectorHasParticle'
import * as CONST from './../../app/constants'
import { randFloat, randInt } from './../../helper/integer/Integer'
import { Vector3, Euler } from 'three'

/**
 *
 * @param {number} min
 * @param {number} max
 * @param {Array.<Number>} exceptAxis
 * @returns {Vector3}
 */
const randomVector3 = function (min, max, exceptAxis = []) {
  const v = new Vector3()
  for (let i = 0; i < 3; i++) {
    if (!exceptAxis.includes(i)) {
      v.setComponent(i, randFloat(min, max))
    }
  }
  return v
}

/**
 *
 * @param {number} min
 * @param {number} max
 * @param {Array.<Number>} exceptAxis
 * @returns {Euler}
 */
const randomEuler = function (min, max, exceptAxis = []) {
  const v = randomVector3(min, max, exceptAxis)
  return new Euler(v.x, v.y, v.z)
}

export const asteroid = []

for (let i = 0; i < 60; i++) {
  const scale = randFloat(0.5, 3)
  const particle = new Asteroid()
    .setRotation(randomEuler(- Math.PI, Math.PI))
    .setPosition(randomVector3(-15000, 15000, [1]))
    .setScale(new Vector3(scale, scale, scale))
    .setMass(2000)
    .setName(`Asteroid-${i + 1}`)

  let keyNumber = randInt(1, 4)

  switch (keyNumber) {
    case 1:
      particle.setModelKey(CONST.KEY_ASTEROID_1)
      break
    case 2:
      particle.setModelKey(CONST.KEY_ASTEROID_2)
      break
    case 3:
      particle.setModelKey(CONST.KEY_ASTEROID_3)
      break
    case 4:
      particle.setModelKey(CONST.KEY_ASTEROID_4)
      break
  }

  asteroid.push(particle)
}

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
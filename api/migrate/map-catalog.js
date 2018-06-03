import Catalog from './../../entity/Catalog'

import { spaceship } from './map-spaceship'
import { starlight } from './map-star-light'
import { equipment } from './map-equipment'
import { asteroid } from './map-asteroid'
import { factory } from './map-factory'
import { station } from './map-station'
import { mineral } from './map-mineral'
import { sector } from './map-sector'
import { status } from './map-status'
import { planet } from './map-planet'
import { engine } from './map-engine'
import { race } from './map-race'
import { gun } from './map-gun'

/**
 *
 * @type {Catalog}
 */
export const catalog = new Catalog()
  .copy(gun)
  .copy(race)
  .copy(sector)
  .copy(status)
  .copy(planet)
  .copy(engine)
  .copy(factory)
  .copy(mineral)
  .copy(station)
  .copy(asteroid)
  .copy(equipment)
  .copy(spaceship)
  .copy(starlight)

/**
 *
 * @param {Db} db
 * @returns {Promise<void>}
 */
export const installCatalog = async function (db) {
  const collection = await db.createCollection('Catalog')
  await collection.deleteMany()
  for (const item of catalog.items) {
    await collection.updateOne({ id: item.id }, { $set: item }, { upsert: true })
  }
}
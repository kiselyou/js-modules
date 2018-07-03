import Catalog from './../../entity/Catalog'
import { insertCatalog } from '../repository/RepositoryCatalog'

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
import { energy } from './map-energy'
import { armor } from './map-armor'
import { shell } from './map-shell'
import { race } from './map-race'
import { gun } from './map-gun'

/**
 *
 * @type {Catalog}
 */
export const catalog = new Catalog()
  .copy(gun)
  .copy(race)
  .copy(shell)
  .copy(armor)
  .copy(energy)
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
 * @returns {Promise<void>}
 */
export const installCatalog = async function () {
  await insertCatalog(catalog)
}
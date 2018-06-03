import { mgDBAsync } from './../db/mongo'
import Catalog from './../../entity/Catalog'

import { installStarlight } from './map-star-light'
import { installAsteroid } from './map-asteroid'
import { installCatalog } from './map-catalog'
import { installStation } from './map-station'
import { installSector } from './map-sector'
import { installPlayer } from './map-player'
import { installPlanet } from './map-planet'

/**
 *
 * @returns {void}
 */
async function start() {
  const db = await mgDBAsync()
  await clearCollection(db)
  await installCatalog(db)

  const catalog = await getCatalog(db)

  const sectorId = 'f8a54ce6-d80d-4a36-b285-f12351b0a8ba'

  await installPlayer(db, catalog)
  await installSector(db, catalog)
  await installPlanet(db, catalog, sectorId)
  await installAsteroid(db, catalog, sectorId)
  await installStation(db, catalog, sectorId)
  await installStarlight(db, catalog, sectorId)

  console.log('FINISHED')
  console.log('press "ctrl + z" to stop watcher')
}

/**
 *
 * @param {Db} db
 */
async function clearCollection(db) {
  const collections = ['Catalog', 'Sector', 'Player', 'SectorHasParticle', 'PlayerHasParticle']
  for (const collectionName of collections) {
    const collection = await db.createCollection(collectionName)
    await collection.deleteMany()
  }
}

/**
 *
 * @param {Db} db
 * @returns {Promise<Catalog>}
 */
async function getCatalog(db) {
  const collection = await db.collection('Catalog');
  const data = await collection.find().toArray()
  return new Catalog().copy(data)
}

start()
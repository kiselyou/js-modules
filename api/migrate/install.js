import { mgDBAsync } from './../db/mongo'
import Catalog from './../../entity/Catalog'
import NodeProcess from './../../helper/package/NodeProcess'

import { installStarlight } from './map-star-light'
import { installAsteroid } from './map-asteroid'
import { installCatalog } from './map-catalog'
import { installStation } from './map-station'
import { installSector } from './map-sector'
import { installPlayer, updatePlayer } from './map-player'
import { installPlanet } from './map-planet'

/**
 *
 * @returns {void}
 */
async function install() {
  const db = await mgDBAsync()
  await clearCollection(db, ['Catalog', 'Sector', 'SectorHasParticle'])
  await installCatalog()

  const catalog = await getCatalog(db)

  const sectorId = 'f8a54ce6-d80d-4a36-b285-f12351b0a8ba'

  await installPlayer(db, catalog)
  await installSector(db, catalog)
  await installPlanet(db, catalog, sectorId)
  await installAsteroid(db, catalog, sectorId)
  await installStation(db, catalog, sectorId)
  await installStarlight(db, catalog, sectorId)

  console.log('INSTALL FINISHED')
  console.log('press "ctrl + z" to stop watcher')
}

/**
 *
 * @return {Promise<void>|void}
 */
async function update() {
  const db = await mgDBAsync()
  await clearCollection(db, ['Catalog'])
  await installCatalog()

  const catalog = await getCatalog(db)

  await updatePlayer(db, catalog)

  console.log('UPDATE FINISHED')
  console.log('press "ctrl + z" to stop watcher')
}

/**
 *
 * @param {Db} db
 * @param {Array.<string>} collections
 */
async function clearCollection(db, collections) {
  for (const collectionName of collections) {
    const collection = await db.createCollection(collectionName)
    await collection.deleteMany({})
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

const action = NodeProcess.runScriptArgument('--migrate')
switch (action) {
  case 'install':
    install()
    break
  case 'update':
    update()
    break
  default:
    console.log('Try to set run script argument (--migrate install | --migrate update)')
}
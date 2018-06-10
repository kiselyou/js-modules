import { mgDBAsync } from './../db/mongo'
import Catalog from './../../entity/Catalog'

const catalog = new Catalog()

/**
 *
 * @param {Catalog} catalog
 * @returns {Promise<void>}
 */
export const insertCatalog = async function (catalog) {
  const db = await mgDBAsync()
  const collection = await db.createCollection('Catalog')
  await collection.deleteMany({})
  for (const item of catalog.items) {
    await collection.updateOne({ id: item.id }, { $set: item }, { upsert: true })
  }
}

/**
 *
 * @returns {Catalog}
 */
export const getCatalog = async function () {
  if ( ! catalog.isLoaded) {
    const db = await mgDBAsync()
    const collection = await db.createCollection('Catalog')
    const data = await collection.find().toArray()
    catalog.copy(data).final()
  }
  return catalog
}

/**
 *
 * @param {string} id
 * @returns {Promise<void>}
 */
export const getSpaceShipById = async function(id) {
  const db = await mgDBAsync()
  const collection = await db.createCollection('Catalog')
  return await collection.findOne({ entity: 'Spaceship', id: id})
}
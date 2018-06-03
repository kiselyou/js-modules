import Sector from './../../entity/particles-sector/Sector'

export const sector = [
  new Sector()
    .setName('Alpha')
    .setId('f8a54ce6-d80d-4a36-b285-f12351b0a8ba')
]

/**
 *
 * @param {Db} db
 * @param {Catalog} catalog
 * @returns {Promise<void>}
 */
export async function installSector(db, catalog) {
  for (let entity of sector) {
    const data = new Sector().copy(entity)
    await createOrUpdate(db, data)
  }
}

/**
 *
 * @param {Db} db
 * @param {Sector|Particle} data
 * @returns {Promise<void>}
 */
async function createOrUpdate(db, data) {
  const collection = db.collection('Sector')
  await collection.updateOne({ id: data.id }, { $set: data }, { upsert: true })
}
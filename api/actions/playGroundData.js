import * as core from './../core'
import ParticlePlayGround from './../../entity/ParticlePlayGround'

/**
 *
 * @param {object} req
 * @param {object} res
 */
export async function playGroundData(req, res) {
  const playerId = req.body['id']
  const db = await core.mgDBAsync()
  const particlePlayGround = new ParticlePlayGround()

  const player = await getPlayer(db, playerId)

  if (player) {
    const universe = await getUniverse(db, 1)
    const sector = await getSector(db, player.sectorId)
    const playerParticle = await getPlayerParticle(db, playerId)
    const playerSpaceship = await getPlayerSpaceship(db, playerId)
    const sectorParticle = await getSectorParticle(db, player.sectorId)

    particlePlayGround
      .setPlayer(player)
      .setPlayer(sector)
      .setUniverse(universe)
      .setPlayerHasParticle(playerParticle)
      .setPlayerHasSpaceship(playerSpaceship)
      .setSectorHasParticle(sectorParticle)
  }

  core.responseJSON(res, particlePlayGround)
}

/**
 *
 * @param {Db} db
 * @param {string} id
 * @returns {Promise<Object>}
 */
async  function getPlayer(db, id) {
  return findOne(db, 'Player', { id } )
}

/**
 *
 * @param {Db} db
 * @param {string} id
 * @returns {Promise<Object>}
 */
async  function getSector(db, id) {
  return findOne(db, 'Sector', { id } )
}

/**
 *
 * @param {Db} db
 * @param {number} id
 * @returns {Promise<Object>}
 */
async  function getUniverse(db, id) {
  return findOne(db, 'Universe', { id } )
}

/**
 *
 * @param {Db} db
 * @param {string} playerId
 * @returns {Promise<Array>}
 */
async function getPlayerSpaceship(db, playerId) {
  return await findMany(db, 'PlayerHasSpaceship', { playerId })
}

/**
 *
 * @param {Db} db
 * @param {string} playerId
 * @returns {Promise<Array>}
 */
async function getPlayerParticle(db, playerId) {
  return await findMany(db, 'PlayerHasParticle', { playerId })
}

/**
 *
 * @param {Db} db
 * @param {string} sectorId
 * @returns {Promise<Array>}
 */
async function getSectorParticle(db, sectorId) {
  return await findMany(db, 'SectorHasParticle', { sectorId })
}

/**
 *
 * @param {Db} db
 * @param {string} collectionName
 * @param {Object} where
 * @returns {Promise<Array>}
 */
async function findMany(db, collectionName, where) {
  const collection = await db.collection(collectionName)
  return await collection.find(where).toArray()
}

/**
 *
 * @param {Db} db
 * @param {string} collectionName
 * @param {Object} where
 * @returns {Promise<Object>}
 */
async function findOne(db, collectionName, where) {
  const collection = await db.collection(collectionName)
  return await collection.findOne(where)
}
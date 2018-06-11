import * as core from './../core'
import ParticlePlayer from './../../entity/ParticlePlayer'

export async function playerDataAdd(req, res) {
  const playerId = req.body['id']
  const db = await core.mgDBAsync()
  const player = await getPlayerById(db, playerId)
  const particlePlayer = new ParticlePlayer()

  if (player) {
    const playerHasParticle = await getPlayerParticle(db, player.id)
    particlePlayer
      .setPlayer(player)
      .setPlayerHasParticle(playerHasParticle)
  }

  core.responseJSON(res, particlePlayer)
}

/**
 *
 * @param {Db} db
 * @param {string} id
 * @returns {Promise<Object>}
 */
async  function getPlayerById(db, id) {
  return findOne(db, 'Player', { id } )
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
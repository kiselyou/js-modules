import * as core from './../core'

/**
 *
 * @param {object} req
 * @param {object} res
 */
export async function playGroundData(req, res) {
  const data = {}
  const player = await getPlayerInfoById('09839694-28d3-4504-9dc9-1cd3b6a539d7')

  if (player) {
    data.player = player
    data.race = await getRace()
    data.status = await getStatus()
    data.mineral = await getMineral()
    data.equipment = await getEquipment()
    data.factory = await getFactory()
    data.sector = await getSectorInfoById(data.player.sectorId)
    data.planet = await getPlanetsInfoBySectorId(data.player.sectorId)
    data.station = await getStationsInfoBySectorId(data.player.sectorId)
    data.star = await getStarByKey(data.sector.starKey)
    data.starLight = await getStarLightByKey(data.sector.starKey)
  }

  core.responseJSON(res, data)
}

/**
 *
 * @param {number} key
 * @returns {Promise.<Object>}
 */
async function getStarByKey(key) {
  const collection = await core.mgDB('Star')
  return collection.find({key: key}).project({position: 1, _id: 0}).toArray()
}

/**
 *
 * @param {number} key
 * @returns {Promise.<Object>}
 */
async function getStarLightByKey(key) {
  const collection = await core.mgDB('StarLight')
  return collection.find({key: key}).toArray()
}

/**
 *
 * @param {string} id
 * @returns {Promise.<Object>}
 */
async function getPlayerInfoById(id) {
  const collection = await core.mgDB('Player')
  return collection.findOne({id: id})
}

/**
 *
 * @param {string} id
 * @returns {Promise.<Object>}
 */
async function getSectorInfoById(id) {
  const collection = await core.mgDB('Sector')
  return collection.findOne({id: id})
}

/**
 *
 * @param {string} id
 * @returns {Promise.<Object>}
 */
async function getPlanetsInfoBySectorId(id) {
  const collection = await core.mgDB('Planet')
  return collection.find({sectorId: id}).toArray()
}

/**
 *
 * @param {string} id
 * @returns {Promise.<Object>}
 */
async function getStationsInfoBySectorId(id) {
  const collection = await core.mgDB('Station')
  return collection.find({sectorId: id}).toArray()
}

/**
 *
 * @returns {Promise.<Array>}
 */
async function getRace() {
  const collection = await core.mgDB('Race')
  return collection.find({}).toArray()
}

/**
 *
 * @returns {Promise.<Array>}
 */
async function getStatus() {
  const collection = await core.mgDB('Status')
  return collection.find({}).toArray()
}

/**
 *
 * @returns {Promise.<Array>}
 */
async function getFactory() {
  const collection = await core.mgDB('Factory')
  return collection.find({}).toArray()
}

/**
 *
 * @returns {Promise.<Array>}
 */
async function getMineral() {
  const collection = await core.mgDB('Mineral')
  return collection.find({}).toArray()
}

/**
 *
 * @returns {Promise.<Array>}
 */
async function getEquipment() {
  const collection = await core.mgDB('Equipment')
  return collection.find({}).toArray()
}
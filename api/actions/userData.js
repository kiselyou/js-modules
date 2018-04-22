import * as core from './../core'

/**
 *
 * @param {object} req
 * @param {object} res
 */
export async function userData(req, res) {
  const data = {
    player: await getPlayerInfoById('e72201be-3511-4957-9660-0a8521faa14d')
  }

  if (data.player) {
    data.race = await getRace()
    data.status = await getStatus()
    data.mineral = await getMineral()
    data.equipment = await getEquipment()
    data.factory = await getFactory()
    data.sector = await getSectorInfoById(data.player.sectorId)
    data.planet = await getPlanetsInfoBySectorId(data.player.sectorId)
    data.station = await getStationsInfoBySectorId(data.player.sectorId)
  }

  core.responseJSON(res, data)
}

async function getPlayerInfoById(id) {
  const collection = await core.mgDB('Player')
  return collection.findOne({id: id})
}

async function getSectorInfoById(id) {
  const collection = await core.mgDB('Sector')
  return collection.findOne({id: id})
}

async function getRace() {
  const collection = await core.mgDB('Race')
  return collection.find({}).toArray()
}

async function getPlanetsInfoBySectorId(id) {
  const collection = await core.mgDB('Planet')
  return collection.find({sectorId: id}).toArray()
}

async function getStationsInfoBySectorId(id) {
  const collection = await core.mgDB('Station')
  return collection.find({sectorId: id}).toArray()
}

async function getStatus() {
  const collection = await core.mgDB('Status')
  return collection.find({}).toArray()
}

async function getFactory() {
  const collection = await core.mgDB('Factory')
  return collection.find({}).toArray()
}

async function getMineral() {
  const collection = await core.mgDB('Mineral')
  return collection.find({}).toArray()
}

async function getEquipment() {
  const collection = await core.mgDB('Equipment')
  return collection.find({}).toArray()
}


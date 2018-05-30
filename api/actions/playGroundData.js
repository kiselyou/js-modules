import * as core from './../core'

/**
 *
 * @param {object} req
 * @param {object} res
 */
export function playGroundData(req, res) {
  const result = {}
  const playerId = req.body['id']
  let i = 0

  getPlayerInfoById(playerId, (data) => {
    i++
    result['player'] = data
    const sectorId = result.player.sectorId

    getSectorInfoById(sectorId, (data) => {
      i++
      result['sector'] = data

      getStarByKey(data.starKey, (data) => {
        i++
        result['star'] = data
      })

      getStarLightByKey(data.starKey, (data) => {
        i++
        result['starLight'] = data
      })
    })

    getPlanetsInfoBySectorId(sectorId, (data) => {
      i++
      result['planet'] = data
    })

    getStationsInfoBySectorId(sectorId, (data) => {
      i++
      result['station'] = data
    })

    getAsteroidsInfoBySectorId(sectorId, (data) => {
      i++
      result['asteroid'] = data
    })
  })

  getRace((data) => {
    i++
    result['race'] = data
  })

  getStatus((data) => {
    i++
    result['status'] = data
  })

  getMineral((data) => {
    i++
    result['mineral'] = data
  })

  getEquipment((data) => {
    i++
    result['equipment'] = data
  })

  getFactory((data) => {
    i++
    result['factory'] = data
  })

  getSpaceship((data) => {
    i++
    result['spaceship'] = data
  })

  getEngine((data) => {
    i++
    result['engine'] = data
  })

  getGun((data) => {
    i++
    result['gun'] = data
  })

  let waitResponse = () => {
    if (i < 15) {
      setTimeout(waitResponse, 50)
    } else {
      core.responseJSON(res, result)
    }
  }

  waitResponse()
}

/**
 *
 * @param {number} key
 * @param {Function} onDone
 * @returns {void}
 */
function getStarByKey(key, onDone) {
  core.mgDB((db, closeConnect) => {
    const collection = db.collection('Star')
    collection
      .find({ key: key })
      .project({ position: 1, _id: 0 })
      .toArray()
      .catch((e) => {
        console.log(e)
        onDone(null)
      })
      .then(onDone)
      .finally(closeConnect)
  })
}

/**
 *
 * @param {number} key
 * @param {Function} onDone
 * @returns {void}
 */
function getStarLightByKey(key, onDone) {
  core.mgDB((db, closeConnect) => {
    const collection = db.collection('StarLight')
    collection
      .find({ key: key })
      .toArray()
      .catch((e) => {
        console.log(e)
        onDone(null)
      })
      .then(onDone)
      .finally(closeConnect)
  })
}

/**
 *
 * @param {string} id
 * @param {Function} onDone
 * @returns {void}
 */
function getPlayerInfoById(id, onDone) {
  core.mgDB((db, closeConnect) => {
    const collection = db.collection('Player')
    collection
      .findOne({ id: id })
      .catch((e) => {
        console.log(e)
        onDone(null)
      })
      .then(onDone)
      .finally(closeConnect)
  })
}

/**
 *
 * @param {string} id
 * @param {Function} onDone
 * @returns {void}
 */
function getSectorInfoById(id, onDone) {
  core.mgDB((db, closeConnect) => {
    const collection = db.collection('Sector')
    collection
      .findOne({ id: id })
      .catch((e) => {
        console.log(e)
        onDone(null)
      })
      .then(onDone)
      .finally(closeConnect)
  })
}

/**
 *
 * @param {string} id
 * @param {Function} onDone
 * @returns {void}
 */
function getPlanetsInfoBySectorId(id, onDone) {
  core.mgDB((db, closeConnect) => {
    const collection = db.collection('Planet')
    collection
      .find({sectorId: id})
      .toArray()
      .catch((e) => {
        console.log(e)
        onDone(null)
      })
      .then(onDone)
      .finally(closeConnect)
  })
}

/**
 *
 * @param {string} id
 * @param {Function} onDone
 * @returns {void}
 */
function getStationsInfoBySectorId(id, onDone) {
  core.mgDB((db, closeConnect) => {
    const collection = db.collection('Station')
    collection
      .find({sectorId: id})
      .toArray()
      .catch((e) => {
        console.log(e)
        onDone(null)
      })
      .then(onDone)
      .finally(closeConnect)
  })
}

/**
 *
 * @param {string} id
 * @param {Function} onDone
 * @returns {void}
 */
function getAsteroidsInfoBySectorId(id, onDone) {
  core.mgDB((db, closeConnect) => {
    const collection = db.collection('Asteroid')
    collection
      .find({sectorId: id})
      .toArray()
      .catch((e) => {
        console.log(e)
        onDone(null)
      })
      .then(onDone)
      .finally(closeConnect)
  })
}

/**
 *
 * @param {Function} onDone
 * @returns {void}
 */
function getRace(onDone) {
  core.mgDB((db, closeConnect) => {
    const collection = db.collection('Race')
    collection
      .find()
      .toArray()
      .catch((e) => {
        console.log(e)
        onDone(null)
      })
      .then(onDone)
      .finally(closeConnect)
  })
}

/**
 *
 * @param {Function} onDone
 * @returns {void}
 */
function getStatus(onDone) {
  core.mgDB((db, closeConnect) => {
    const collection = db.collection('Status')
    collection
      .find()
      .toArray()
      .catch((e) => {
        console.log(e)
        onDone(null)
      })
      .then(onDone)
      .finally(closeConnect)
  })
}

/**
 *
 * @param {Function} onDone
 * @returns {void}
 */
function getFactory(onDone) {
  core.mgDB((db, closeConnect) => {
    const collection = db.collection('Factory')
    collection
      .find()
      .toArray()
      .catch((e) => {
        console.log(e)
        onDone(null)
      })
      .then(onDone)
      .finally(closeConnect)
  })
}

/**
 *
 * @param {Function} onDone
 * @returns {void}
 */
function getMineral(onDone) {
  core.mgDB((db, closeConnect) => {
    const collection = db.collection('Mineral')
    collection
      .find()
      .toArray()
      .catch((e) => {
        console.log(e)
        onDone(null)
      })
      .then(onDone)
      .finally(closeConnect)
  })
}

/**
 *
 * @param {Function} onDone
 * @returns {void}
 */
function getEquipment(onDone) {
  core.mgDB((db, closeConnect) => {
    const collection = db.collection('Equipment')
    collection
      .find()
      .toArray()
      .catch((e) => {
        console.log(e)
        onDone(null)
      })
      .then(onDone)
      .finally(closeConnect)
  })
}

/**
 *
 * @param {Function} onDone
 * @returns {void}
 */
function getSpaceship(onDone) {
  core.mgDB((db, closeConnect) => {
    const collection = db.collection('Spaceship')
    collection
      .find()
      .toArray()
      .catch((e) => {
        console.log(e)
        onDone(null)
      })
      .then(onDone)
      .finally(closeConnect)
  })
}

/**
 *
 * @param {Function} onDone
 * @returns {void}
 */
function getEngine(onDone) {
  core.mgDB((db, closeConnect) => {
    const collection = db.collection('Engine')
    collection
      .find()
      .toArray()
      .catch((e) => {
        console.log(e)
        onDone(null)
      })
      .then(onDone)
      .finally(closeConnect)
  })
}

/**
 *
 * @param {Function} onDone
 * @returns {void}
 */
function getGun(onDone) {
  core.mgDB((db, closeConnect) => {
    const collection = db.collection('Gun')
    collection
      .find()
      .toArray()
      .catch((e) => {
        console.log(e)
        onDone(null)
      })
      .then(onDone)
      .finally(closeConnect)
  })
}
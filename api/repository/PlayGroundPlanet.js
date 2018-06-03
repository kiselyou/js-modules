import { mgDB } from '../db/mongo'
import Planet from './../../entity/particles-sector/Planet'

class PlayGroundPlanet {
  constructor() {

  }

  /**
   * @param {Array.<Object>} planets
   * @callback planetInfoCallback
   */

  /**
   *
   * @param {string} id
   * @param {planetInfoCallback} planetInfoCallback
   */
  getPlanetsBySectorId(id, planetInfoCallback) {
    // mgDB((db, closeConnect) => {
    //   const collection = db.collection('Planet')
    //   collection
    //     .find({ sectorId: id })
    //     .toArray()
    //     .catch((e) => console.log(e))
    //     .then((data) => {
    //       const planets = this._preparePlanets(data)
    //       planetInfoCallback(planets)
    //     })
    //     .finally(closeConnect)
    // })
  }

  /**
   *
   * @param {Array.<Object>} planets
   * @returns {Array.<Planet>}
   * @private
   */
  _preparePlanets(planets) {
    const arr = []
    for (const planet of planets) {
      arr.push(new Planet().copy(planet))
    }

    const prepare = {}
    for (const planet of arr) {
      prepare[planet.id] = planet
    }

    for (const planet of arr) {
      const parentId = planet.parentId
      if (prepare.hasOwnProperty(parentId)) {
        planet.setParentPlanet(prepare[parentId])
      }
      // TODO: переделать расчет движения планет
      // planet.calculatePosition()
    }
    return arr
  }

  /**
   *
   * @param {Array.<Planet>} planets
   */
  updatePlanetsInfo(planets) {
    mgDB((db, closeConnect) => {
      const collection = db.collection('Planet')
      for (const planet of planets) {
        collection.updateOne(
            { id: planet.id },
            { $set: { angleToCenter: planet.angleToCenter } },
            { upsert: true }
          )
          .catch(() => new Error('Cannot create/update "Planet" angleToCenter'))
          .finally(closeConnect)
      }
    })
  }

  /**
   *
   * @param {number} delta
   * @param {Array.<Planet>} planets
   */
  update(delta, planets) {
    for (let planet of planets) {
      // TODO: переделать расчет движения планет
      // planet.calculatePosition(delta)
    }
  }
}

export default PlayGroundPlanet
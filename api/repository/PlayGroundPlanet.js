import { mgDB } from '../db/mongo'
import Planet from './../../entity/sector/Planet'

class PlayGroundPlanet {
  constructor() {

  }

  /**
   *
   * @param {string} id
   * @returns {Array.<Planet>}
   */
  async getPlanetsInfoBySectorId(id) {
    const res = []
    const collection = await mgDB('Planet')
    const planets = await collection.find({sectorId: id}).toArray()
    for (const planet of planets) {
      res.push(new Planet().copy(planet))
    }
    return this._preparePlanets(res)
  }

  /**
   *
   * @param {Array.<Planet>} planets
   * @returns {Array.<Planet>}
   * @private
   */
  _preparePlanets(planets) {
    const prepare = {}
    for (const planet of planets) {
      prepare[planet.id] = planet
    }

    for (const planet of planets) {
      const parentId = planet.parentId
      if (prepare.hasOwnProperty(parentId)) {
        planet.setParentPlanet(prepare[parentId])
      }
      planet.calculatePosition()
    }
    return planets
  }

  /**
   *
   * @param {Array.<Planet>} planets
   */
  updatePlanetsInfo(planets) {
    const collection = mgDB('Planet')
    for (const planet of planets) {
      collection.then((db) => {
        db.updateOne(
          {id: planet.id},
          {$set: {position: planet.position, angleToCenter: planet.angleToCenter}},
          {upsert: true},
          (err) => {
            if (err) {
              throw new Error('Cannot upsert timestamp')
            }
          }
        )
      })
    }
  }

  /**
   *
   * @param {number} delta
   * @param {Array.<Planet>} planets
   */
  update(delta, planets) {
    for (let planet of planets) {
      planet.calculatePosition(delta)
    }
  }
}

export default PlayGroundPlanet
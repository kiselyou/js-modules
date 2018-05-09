import { mgDB } from '../db/mongo'
import Sector from './../../entity/sector/Sector'
import PlayGroundPlanet from './PlayGroundPlanet'

class PlayGroundSector {
  constructor() {
    /**
     *
     * @type {PlayGroundPlanet}
     */
    this.playGroundPlanet = new PlayGroundPlanet()
  }

  /**
   *
   * @returns {Promise.<Array.<Sector>>}
   */
  async getSectorsInfo() {
    const res = []
    const collection = await mgDB('Sector')
    const sectors = await collection.find().toArray()
    for (const sector of sectors) {
      const planets = await this.playGroundPlanet.getPlanetsInfoBySectorId(sector.id)
      res.push(
        new Sector()
          .copy(sector)
          .addPlanets(planets)
      )
    }
    return res
  }

  /**
   *
   * @param {Array.<Sector>} sectors
   * @returns {void}
   */
  updateSectorsInfo(sectors) {
    const collection = mgDB('Sector')
    for (const sector of sectors) {
      this.playGroundPlanet.updatePlanetsInfo(sector.planets)
      collection.then((db) => {
        db.updateOne(
          {id: sector.id},
          {$set: {position: sector.position}},
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
   * @param {Array.<Sector>} sectors
   */
  update(delta, sectors) {
    for (let sector of sectors) {
      this.playGroundPlanet.update(delta, sector.planets)
    }
  }
}

export default PlayGroundSector
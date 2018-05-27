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
   * @param {Array.<Sector>} sectors
   * @callback sectorsInfoCallback
   */

  /**
   *
   * @param {sectorsInfoCallback} sectorsInfoCallback
   */
  findSectors(sectorsInfoCallback) {
    mgDB((db, closeConnect) => {
      const collection = db.collection('Sector')
      collection
        .find()
        .toArray()
        .then((sectors) => {
          this._prepareSectors(sectors, sectorsInfoCallback)
        })
        .finally(closeConnect)
        .catch((e) => console.log(e))
    })
  }

  /**
   *
   * @param {Array.<Object>} sectors
   * @param {sectorsInfoCallback} sectorsInfoCallback
   * @returns {void}
   * @private
   */
  _prepareSectors(sectors, sectorsInfoCallback) {
    const res = []
    for (let i = 0; i < sectors.length; i++) {
      const sector = sectors[i]
      this.playGroundPlanet.getPlanetsBySectorId(sector.id, (planets) => {
        res.push(
          new Sector()
            .copy(sector)
            .addPlanets(planets)
        )

        if (i === sectors.length - 1) {
          sectorsInfoCallback(res)
        }
      })
    }
  }

  /**
   *
   * @param {Array.<Sector>} sectors
   * @returns {void}
   */
  updateSectorsInfo(sectors) {
    for (const sector of sectors) {
      this.playGroundPlanet.updatePlanetsInfo(sector.planets)
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
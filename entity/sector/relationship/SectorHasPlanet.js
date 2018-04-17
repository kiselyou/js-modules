import uuidV4 from 'uuid/v4'

class SectorHasPlanet {
  constructor() {
    /**
     * @type {string}
     */
    this.id = uuidV4()

    /**
     *
     * @type {string}
     */
    this.sectorId = null

    /**
     *
     * @type {string}
     */
    this.planetId = null
  }
}

export default SectorHasPlanet
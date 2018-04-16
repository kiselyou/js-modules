import uuidV4 from 'uuid/v4'

class PlanetHasStation {
  constructor() {
    /**
     * @type {string}
     */
    this.id = uuidV4()

    /**
     *
     * @type {string}
     */
    this.planetId = null

    /**
     *
     * @type {string}
     */
    this.stationId = null
  }
}

export default PlanetHasStation
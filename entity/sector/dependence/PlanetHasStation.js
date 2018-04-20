import uuidV4 from 'uuid/v4'

class PlanetHasStation {
  constructor() {
    /**
     * @type {string}
     */
    this.className = this.constructor.name

    /**
     * @type {string}
     */
    this.id = uuidV4()

    /**
     *
     * @type {string}
     */
    this.stationId = null
  }

  /**
   *
   * @param {string} id
   * @returns {PlanetHasStation}
   */
  setStationId(id) {
    this.stationId = id
    return this
  }
}

export default PlanetHasStation
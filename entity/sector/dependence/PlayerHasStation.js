import uuidV4 from 'uuid/v4'

class PlayerHasStation {
  constructor() {
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
   * @returns {PlayerHasStation}
   */
  setStationId(id) {
    this.stationId = id
    return this
  }
}

export default PlayerHasStation
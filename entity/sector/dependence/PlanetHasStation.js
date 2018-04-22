import uuidV4 from 'uuid/v4'

class PlanetHasStation {
  constructor() {
    /**
     * @type {string}
     */
    this.entity = this.constructor.name

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

  /**
   *
   * @param {object} data
   * @returns {PlanetHasStation}
   */
  copy(data) {
    for (const property in data) {
      if (data.hasOwnProperty(property)) {
        switch (property) {
          case 'entity':
            break
          default:
            this[property] = data[property]
            break
        }
      }
    }
    return this
  }
}

export default PlanetHasStation
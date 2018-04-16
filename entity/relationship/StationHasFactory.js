import uuidV4 from 'uuid/v4'

class StationHasFactory {
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

    /**
     *
     * @type {string}
     */
    this.factoryId = null
  }
}

export default StationHasFactory
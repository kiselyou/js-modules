import uuidV4 from 'uuid/v4'

/**
 * Для производства оборудования заводам станции нужны минералы
 */
class StationHasMineral {
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
    this.mineralId = null
  }
}

export default StationHasMineral
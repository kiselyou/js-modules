import uuidV4 from 'uuid/v4'

/**
 * Цена по которой станция продает/покупает минерал
 */
class StationHasMineralPrice {
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

    /**
     *
     * @type {number}
     */
    this.price = null
  }
}
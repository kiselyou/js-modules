import uuidV4 from 'uuid/v4'

/**
 * Цена по которой станция продает/покупает оборудование
 */
class StationHasEquipmentPrice {
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
    this.equipmentId = null

    /**
     *
     * @type {number}
     */
    this.price = null
  }
}

export default StationHasEquipmentPrice
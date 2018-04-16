import uuidV4 from 'uuid/v4'

/**
 * Склад. Оборудование произведенное станцией
 */
class StationHasEquipment {
  constructor() {
    /**
     * @type {string}
     */
    this.id = uuidV4()

    /**
     *
     * @type {string}
     */
    this.equipmentId = null

    /**
     *
     * @type {string}
     */
    this.stationId = null
  }
}

export default StationHasEquipment
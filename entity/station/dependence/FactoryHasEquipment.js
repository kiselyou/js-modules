import uuidV4 from 'uuid/v4'

/**
 * Склад оборудования
 */
class FactoryHasEquipment {
  constructor() {
    /**
     * @type {string}
     */
    this.id = uuidV4()

    /**
     *
     * @type {string}
     */
    this.factoryId = null

    /**
     *
     * @type {string}
     */
    this.equipmentId = null
  }
}

export default FactoryHasEquipment
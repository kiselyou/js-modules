import uuidV4 from 'uuid/v4'

class FactoryEquipmentConfig {
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
    this.factoryId = null

    /**
     *
     * @type {number}
     */
    this.condition = 1
  }
}

export default FactoryEquipmentConfig
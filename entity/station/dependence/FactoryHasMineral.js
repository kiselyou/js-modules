import uuidV4 from 'uuid/v4'

/**
 * Склад минералов
 */
class FactoryHasMineral {
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
    this.mineralId = null
  }
}

export default FactoryHasMineral
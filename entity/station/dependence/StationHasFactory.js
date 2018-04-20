import uuidV4 from 'uuid/v4'

/**
 * Привязка завода к станции
 */
class StationHasFactory {
  constructor() {
    /**
     * @type {string}
     */
    this.className = this.constructor.name

    /**
     * @type {string}
     */
    this.id = uuidV4()

    /**
     *
     * @type {string}
     */
    this.factoryId = null
  }

  /**
   *
   * @param {string} factoryId
   * @returns {StationHasFactory}
   */
  setFactoryId(factoryId) {
    this.factoryId = factoryId
    return this
  }
}

export default StationHasFactory
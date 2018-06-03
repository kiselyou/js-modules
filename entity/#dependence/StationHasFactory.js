import uuidV4 from 'uuid/v4'

/**
 * Привязка завода к станции
 */
class StationHasFactory {
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
     * @type {string|?}
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

  /**
   *
   * @param {object} data
   * @returns {StationHasFactory}
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

export default StationHasFactory
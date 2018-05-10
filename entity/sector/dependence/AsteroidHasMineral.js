import uuidV4 from "uuid/v4";

class AsteroidHasMineral {
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
     * @type {number}
     */
    this.units = 0

    /**
     *
     * @type {string|?}
     */
    this.mineralId = null
  }

  /**
   *
   * @param {number} value
   * @returns {AsteroidHasMineral}
   */
  setUnits(value) {
    this.units = value
    return this
  }

  /**
   *
   * @param {string} id
   * @returns {AsteroidHasMineral}
   */
  setMineralId(id) {
    this.mineralId = id
    return this
  }

  /**
   *
   * @param {object} data
   * @returns {AsteroidHasMineral}
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

export default AsteroidHasMineral
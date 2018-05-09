
class SwapInfo {
  constructor() {
    /**
     *
     * @type {Object}
     */
    this.universe = null

    /**
     *
     * @type {Object}
     */
    this.sector = null
  }

  /**
   *
   * @param {Object} value
   * @returns {SwapInfo}
   */
  setSector(value) {
    this.sector = value
    return this
  }

  /**
   *
   * @param {Object} value
   * @returns {SwapInfo}
   */
  setUniverse(value) {
    this.universe = value
    return this
  }

  /**
   *
   * @param {object} data
   * @returns {SwapInfo}
   */
  copy(data) {
    for (const property in this) {
      if (this.hasOwnProperty(property)) {
        this[property] = data[property]
      }
    }
    return this
  }
}

export default SwapInfo
class Universe {
  constructor() {
    /**
     * @type {string}
     */
    this.entity = this.constructor.name

    /**
     *
     * @type {number}
     */
    this.timestamp = 0
  }

  /**
   *
   * @param {number} value
   */
  setTimestamp(value) {
    this.timestamp = value
    return this
  }

  /**
   *
   * @param {Object} data
   * @param {Array} [except]
   * @returns {Universe}
   */
  copy(data, except = []) {
    for (const property in data) {
      if (except.includes(property)) {
        continue
      }
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

  /**
   *
   * @returns {Array.<Object>}
   */
  getSwapInfo() {
    const data = {}
    const properties = ['timestamp']
    for (const property of properties) {
      switch (property) {
        default:
          data[property] = this[property]
      }

    }
    return data
  }
}

export default Universe

class Universe {
  /**
   *
   * @param {number} id
   */
  constructor(id) {
    /**
     * @type {string}
     */
    this.entity = this.constructor.name

    /**
     *
     * @type {number}
     */
    this.id = id

    /**
     *
     * @type {number}
     */
    this.timestamp = 0
  }

  /**
   *
   * @param {object} data
   * @returns {Universe}
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

export default Universe
import uuidV4 from 'uuid/v4'

class Particle {
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
     * @type {?string}
     */
    this.categoryName = null

    /**
     *
     * @type {?string}
     */
    this.catalogId = null

    /**
     *
     * @type {string|?}
     */
    this.name = null

    /**
     *
     * @type {string|?}
     */
    this.description = null
  }

  /**
   *
   * @param {string} id
   * @returns {Particle}
   */
  setId(id) {
    this.id = id
    return this
  }

  /**
   *
   * @param {string} id
   * @returns {Particle}
   */
  setCatalogId(id) {
    this.catalogId = id
    return this
  }

  /**
   *
   * @param {string} value
   * @returns {Particle}
   */
  setCategoryName(value) {
    this.categoryName = value
    return this
  }

  /**
   *
   * @returns {Particle}
   */
  rebuildId() {
    this.id = uuidV4()
    return this
  }

  /**
   *
   * @param {string} name
   * @returns {Particle}
   */
  setName(name) {
    this.name = name
    return this
  }

  /**
   *
   * @param {string} value
   * @returns {Particle}
   */
  setDescription(value) {
    this.description = value
    return this
  }

  /**
   *
   * @param {Object|null} data - if is null then values will be reset to null
   * @param {Array} [except]
   * @returns {Particle}
   */
  copy(data, except = []) {
    for (const property in data) {
      if ( ! this.hasOwnProperty(property)) {
        continue
      }

      if (except.includes(property)) {
        continue
      }

      switch (property) {
        case 'entity':
          break
        default:
          this[property] = data[property]
          break
      }
    }
    return this
  }

  get swapProperties() {
    return []
  }

  /**
   *
   * @param {Object} data
   * @returns {Engine}
   */
  setSwapInfo(data) {
    for (const property of this.swapProperties) {
      this[property] = data[property]
    }
    return this
  }

  /**
   * @returns {Object}
   */
  getSwapInfo() {
    const res = {}
    for (const property of this.swapProperties) {
      res[property] = this[property]
    }
    return res
  }
}

export default Particle
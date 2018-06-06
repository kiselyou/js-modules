import uuidV4 from 'uuid/v4'

class Particle {
  constructor() {
    /**
     * @type {string}
     */
    this.entity = this.constructor.name

    /**
     *
     * @type {string|?}
     */
    this.name = null

    /**
     *
     * @type {string}
     */
    this.description = null

    /**
     * @type {string}
     */
    this.id = uuidV4()
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
   * @param {Object} data
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

export default Particle
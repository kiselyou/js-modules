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
     * @type {string}
     */
    this.id = uuidV4()

    /**
     *
     * @type {string|?}
     */
    this.raceId = null
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
   * @param {string} name
   * @returns {Particle}
   */
  setName(name) {
    this.name = name
    return this
  }

  /**
   *
   * @param {string} id
   * @returns {Particle}
   */
  setRaceId(id) {
    this.raceId = id
    return this
  }

  /**
   *
   * @param {object} data
   * @returns {Particle}
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

export default Particle
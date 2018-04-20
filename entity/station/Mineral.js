import uuidV4 from 'uuid/v4'

class Mineral {
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
    this.name = null

    /**
     *
     * @type {number}
     */
    this.weight = 1
  }

  /**
   *
   * @param {string} name
   * @returns {Mineral}
   */
  setName(name) {
    this.name = name
    return this
  }

  /**
   *
   * @param {number} weight
   * @returns {Mineral}
   */
  setWeight(weight) {
    this.weight = weight
    return this
  }
}

export default Mineral
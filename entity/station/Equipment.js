import uuidV4 from 'uuid/v4'

class Equipment {
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
     * @type {string}
     */
    this.name = null

    /**
     *
     * @type {number}
     */
    this.weight = 1

    /**
     *
     * @type {string}
     */
    this.description = null
  }

  /**
   *
   * @param {string} id
   * @returns {Equipment}
   */
  setId(id) {
    this.id = id
    return this
  }

  /**
   *
   * @param {string} name
   * @returns {Equipment}
   */
  setName(name) {
    this.name = name
    return this
  }

  /**
   *
   * @param {string} value
   * @returns {Equipment}
   */
  setDescription(value) {
    this.description = value
    return this
  }

  /**
   *
   * @param {number} weight
   * @returns {Equipment}
   */
  setWeight(weight) {
    this.weight = weight
    return this
  }
}

export default Equipment
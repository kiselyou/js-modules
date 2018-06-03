
class PlanetGlow {
  constructor() {
    this.type = PlanetGlow.GLOW_INSIDE
    /**
     *
     * @type {boolean}
     */
    this.enabled = false

    /**
     *
     * @type {number}
     */
    this.color = 0xFFFFFF

    /**
     *
     * @type {number}
     */
    this.coefficient = 0.5

    /**
     *
     * @type {number}
     */
    this.power = 1.7

    /**
     *
     * @type {number}
     */
    this.length = 1.5
  }

  /**
   *
   * @param {boolean} value
   * @returns {PlanetGlow}
   */
  enable(value = true) {
    this.enabled = value
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {PlanetGlow}
   */
  setColor(value) {
    this.color = value
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {PlanetGlow}
   */
  setCoefficient(value) {
    this.coefficient = value
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {PlanetGlow}
   */
  setPower(value) {
    this.power = value
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {PlanetGlow}
   */
  setLength(value) {
    this.length = value
    return this
  }

  /**
   *
   * @param {Object} data
   * @param {Array} [except]
   * @returns {PlanetGlow}
   */
  copy(data, except = []) {
    for (const property in data) {
      if (except.includes(property)) {
        continue
      }
      if (data.hasOwnProperty(property)) {
        this[property] = data[property]
      }
    }
    return this
  }

  /**
   *
   * @returns {number}
   */
  static get GLOW_INSIDE() {
    return 1
  }

  /**
   *
   * @returns {number}
   */
  static get GLOW_OUTSIDE() {
    return 2
  }
}

export default PlanetGlow
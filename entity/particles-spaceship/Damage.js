import { roundPlus } from './../../helper/integer/Integer'

class Damage {
  constructor() {
    /**
     *
     * @type {number}
     */
    this.type = Damage.TYPE_SLIP

    /**
     * Damage size - %
     *
     * @type {number}
     */
    this.percent = 50

    /**
     * Min damage size - points (едениц)
     *
     * @type {number}
     */
    this.min = 15
  }

  /**
   *
   * @param {number} value - constants of current class
   * @returns {Damage}
   */
  setType(value) {
    this.type = value
    return this
  }

  /**
   * Damage size - %
   *
   * @param {number} value
   * @returns {Damage}
   */
  setPercent(value) {
    this.percent = value
    return this
  }

  /**
   * Get damage size - %
   *
   * @param {number} size
   * @returns {number}
   */
  getSize(size) {
    const value = roundPlus(size - this.percent / 100 * size, 1)
    return value < this.min ? this.min : value
  }

  /**
   * Min damage size - points (едениц)
   *
   * @param {number} value
   * @returns {Damage}
   */
  setMin(value) {
    this.min = value
    return this
  }

  /**
   *
   * @param {Object|null} data - if is null then values will be reset to null
   * @param {Array} [except]
   * @returns {Damage}
   */
  copy(data, except = []) {
    for (const property in data) {
      if ( ! this.hasOwnProperty(property)) {
        continue
      }
      if (except.includes(property)) {
        continue
      }
      this[property] = data[property]
    }
    return this
  }

  /**
   *
   * @returns {number}
   */
  static get TYPE_SLIP() {
    return 1
  }
}

export default Damage
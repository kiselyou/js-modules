import Particle from './../Particle'

class Shell extends Particle {
  constructor() {
    super()

    /**
     *
     * @type {string|?}
     */
    this.modelKey = null

    /**
     * Текущее состояние корпуса - (0-100)%
     *
     * @type {number}
     */
    this.state = 100

    /**
     * Размер карабля, вместимость
     *
     * @type {number}
     */
    this.size = 2000
  }

  /**
   *
   * @param {number} value
   * @returns {Shell}
   */
  setState(value) {
    this.state = value
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {Shell}
   */
  setSize(value) {
    this.size = value
    return this
  }

  /**
   *
   * @param {string} value
   * @returns {Shell}
   */
  setModelKey(value) {
    this.modelKey = value
    return this
  }
}

export default Shell
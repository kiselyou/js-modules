import Particle from './../Particle'

class Armor extends Particle {
  constructor() {
    super()

    /**
     * Текущее состояние брони - (0-100)%
     *
     * @type {number}
     */
    this.state = 100
  }

  /**
   *
   * @param {number} value
   * @returns {Armor}
   */
  setState(value) {
    this.state = value
    return this
  }
}

export default Armor
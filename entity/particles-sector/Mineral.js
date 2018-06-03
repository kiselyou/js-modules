import Particle from './../Particle'

class Mineral extends Particle {
  constructor() {
    super()

    /**
     *
     * @type {number}
     */
    this.weight = 1
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
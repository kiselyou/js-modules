import Particle from './../Particle'
class Gun extends Particle {
  constructor() {
    super()

    /**
     *
     * @type {string|?}
     */
    this.raceId = null
  }

  /**
   *
   * @param {string} id
   * @returns {Equipment}
   */
  setRaceId(id) {
    this.raceId = id
    return this
  }

  /**
   *
   * @param {Object} data
   * @param {Array} [except]
   * @returns {Gun}
   */
  copy(data, except = []) {
    super.copy(data, except)
    return this
  }
}

export default Gun
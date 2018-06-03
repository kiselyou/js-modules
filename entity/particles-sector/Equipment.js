import uuidV4 from 'uuid/v4'
import Particle from './../Particle'

class Equipment extends Particle {
  constructor() {
    super()

    /**
     *
     * @type {number}
     */
    this.weight = 1

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
   * @param {number} weight
   * @returns {Equipment}
   */
  setWeight(weight) {
    this.weight = weight
    return this
  }
}

export default Equipment
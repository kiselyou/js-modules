import { Vector3 } from 'three'
import Particle from './../Particle'

class Star extends Particle {
  constructor() {
    super()

    /**
     *
     * @type {Vector3}
     */
    this.position = new Vector3()

    /**
     * @type {string}
     */
    this.sectorId = null
  }

  /**
   *
   * @param {string} value
   * @returns {Star}
   */
  setSectorId(value) {
    this.sectorId = value
    return this
  }
}

export default Star
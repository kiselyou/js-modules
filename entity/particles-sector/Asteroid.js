import Particle from './../Particle'

class Asteroid extends Particle {
  constructor() {
    super()

    /**
     *
     * @type {number}
     */
    this.angleToCenter = 0

    /**
     *
     * @type {number}
     */
    this.distanceToCenter = 0

    /**
     *
     * @type {number}
     */
    this.speedMove = 0

    /**
     *
     * @type {number}
     */
    this.size = 10

    /**
     *
     * @type {string|?}
     */
    this.modelKey = null
  }

  /**
   *
   * @param {string} value
   * @returns {Asteroid}
   */
  setModelKey(value) {
    this.modelKey = value
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {Asteroid}
   */
  setSize(value) {
    this.size = value
    return this
  }

  /**
   * Distance to center of Sector
   *
   * @param {number} value
   * @returns {Asteroid}
   */
  setDistanceToCenter(value) {
    this.distanceToCenter = value
    return this
  }

  /**
   *
   * @param {number} degree
   * @returns {Asteroid}
   */
  setAngleToCenter(degree) {
    this.angleToCenter = degree
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {Asteroid}
   */
  setSpeedMove(value) {
    this.speedMove = value
    return this
  }
}

export default Asteroid
import Particle from './../Particle'

class Station extends Particle {
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
     * @type {string|?}
     */
    this.raceId = null

    /**
     *
     * @type {string|?}
     */
    this.modelKey = null
  }

  /**
   *
   * @param {string} value
   * @returns {Station}
   */
  setModelKey(value) {
    this.modelKey = value
    return this
  }

  /**
   *
   * @param {string} id
   * @returns {Station}
   */
  setRaceId(id) {
    this.raceId = id
    return this
  }

  /**
   * Distance to center of Sector
   *
   * @param {number} value
   * @returns {Station}
   */
  setDistanceToCenter(value) {
    this.distanceToCenter = value
    return this
  }

  /**
   *
   * @param {number} degree
   * @returns {Station}
   */
  setAngleToCenter(degree) {
    this.angleToCenter = degree
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {Station}
   */
  setSpeedMove(value) {
    this.speedMove = value
    return this
  }
}

export default Station
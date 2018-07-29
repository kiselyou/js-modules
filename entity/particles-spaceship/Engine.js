import Particle from './../Particle'
import { Math as TMath } from 'three'

class Engine extends Particle {
  constructor() {
    super()

    /**
     * This is a current speed
     *
     * @type {number}
     */
    this.speed = 0

    /**
     * This is a max speed of ship. This speed depend on "angularSpeed"
     *
     * @type {number}
     */
    this.maxSpeed = 350

    /**
     * This is a max speed of ship. This speed depend on "angularSpeed"
     *
     * @type {number}
     */
    this.maxReverseSpeed = - 15

    /**
     * Speed of rotation on axis "Y"
     *
     * @type {number}
     */
    this.angularSpeed = 3.5

    /**
     * This is a current angle of ship
     *
     * @type {number}
     */
    this.bodyOrientation = 0

    /**
     *
     * @type {number}
     */
    this.acceleration = 400

    /**
     *
     * @type {number}
     */
    this.deceleration = 400

    /**
     * Radian
     *
     * @type {number}
     */
    this.maxInclineAngle = TMath.degToRad(60)

    /**
     * This value is percent fom speed spaceship
     *
     * @type {number}
     */
    this.inclineSpeed = 15

    /**
     *
     * @type {string|?}
     */
    this.raceId = null

    /**
     *
     * @type {boolean}
     */
    this.lockStatus = false

    /**
     * Default is 2 sec.
     *
     * @type {number}
     */
    this.lockTime = 2000
  }

  /**
   *
   * @param {number} value
   * @returns {Engine}
   */
  setLockTime(value) {
    this.lockTime = value
    return this
  }

  /**
   * @returns {Engine}
   */
  lock() {
    this.speed = 0
    this.lockStatus = true
    return this
  }

  /**
   * @returns {Engine}
   */
  unlock() {
    this.lockStatus = false
    return this
  }

  /**
   *
   * @param {string} id
   * @returns {Engine}
   */
  setRaceId(id) {
    this.raceId = id
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {Engine}
   */
  setCurrentSpeed(value) {
    this.speed = value;
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {Engine}
   */
  setMaxSpeed(value) {
    this.maxSpeed = value;
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {Engine}
   */
  setMaxReverseSpeed(value) {
    this.maxReverseSpeed = value < 0 ? value : - value;
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {Engine}
   */
  setAngularSpeed(value) {
    this.angularSpeed = value;
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {Engine}
   */
  setBodyOrientation(value) {
    this.bodyOrientation = value;
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {Engine}
   */
  setAcceleration(value) {
    this.acceleration = value;
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {Engine}
   */
  setDeceleration(value) {
    this.deceleration = value;
    return this
  }

  /**
   *
   * @param {Object} data
   * @param {Array} [except]
   * @returns {Engine}
   */
  copy(data, except = []) {
    super.copy(data, except)
    return this
  }

  get swapProperties() {
    return [
      'deceleration',
      'acceleration',
      'bodyOrientation',
      'angularSpeed',
      'maxReverseSpeed',
      'maxSpeed',
      'speed',
    ]
  }
}

export default Engine
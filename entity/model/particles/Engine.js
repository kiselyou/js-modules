import Particle from './../Particle'

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
    this.maxReverseSpeed = value;
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
   * @returns {Engine}
   */
  copy(data) {
    super.copy(data)
    return this
  }
}

export default Engine
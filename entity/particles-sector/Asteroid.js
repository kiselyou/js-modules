import Particle from './../Particle'
import { Euler, Vector3 } from 'three'
import { KEY_ASTEROID_1 } from './../../app/constants'

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
     * @type {string}
     */
    this.modelKey = KEY_ASTEROID_1

    /**
     *
     * @type {Euler}
     */
    this.rotation = new Euler()

    /**
     *
     * @type {Vector3}
     */
    this.position = new Vector3()

    /**
     *
     * @type {Vector3}
     */
    this.scale = new Vector3(1, 1, 1)
  }

  /**
   *
   * @param {Euler} e
   * @returns {Asteroid}
   */
  setRotation(e) {
    this.rotation.copy(e)
    return this
  }

  /**
   *
   * @param {Vector3} v
   * @returns {Asteroid}
   */
  setScale(v) {
    this.scale.copy(v)
    return this
  }

  /**
   *
   * @param {Vector3} v
   * @returns {Asteroid}
   */
  setPosition(v) {
    this.position.copy(v)
    return this
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
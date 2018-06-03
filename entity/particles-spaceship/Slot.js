import { Vector3 } from 'three'
import Particle from './../Particle'
import Engine from './Engine'
import Gun from './Gun'

class Slot extends Particle {
  constructor() {
    super()

    /**
     *
     * @type {Vector3}
     */
    this.position = new Vector3()

    /**
     *
     * @type {boolean}
     */
    this.enabled = false

    /**
     *
     * @type {number|?}
     */
    this.type = null

    /**
     *
     * @type {Particle|?}
     */
    this.particle = null

    /**
     *
     * @type {string|?}
     */
    this.particleId = null
  }

  /**
   *
   * @param {boolean} value
   * @returns {Slot}
   */
  enable(value = true) {
    this.enabled = value
    return this
  }

  /**
   *
   * @param {number} value - constants of current class
   * @returns {Slot}
   */
  setType(value) {
    this.type = value
    return this
  }

  /**
   *
   * @param {Particle} value
   * @returns {Slot}
   */
  setParticle(value) {
    this.particle = value
    return this;
  }

  /**
   *
   * @param {string} value
   * @returns {Slot}
   */
  setParticleId(value) {
    this.enable()
    this.particleId = value
    return this;
  }

  /**
   *
   * @param {object} data
   * @param {Array} [except]
   * @returns {Slot}
   */
  copy(data, except = []) {
    for (const property in data) {
      if (except.includes(property)) {
        continue
      }
      if (data.hasOwnProperty(property)) {
        const value = data[property]
        switch (property) {
          case 'entity':
            break
          case 'particle':
            this._copyParticle(value)
            break
          case 'position':
            this[property].copy(value)
            break
          default:
            this[property] = value
            break
        }
      }
    }
    return this
  }

  /**
   *
   * @param {Object} particle
   * @returns {void}
   * @private
   */
  _copyParticle(particle) {
    if ( ! particle) {
      this.particle = null
      return
    }

    const type = particle['type']

    if (this.particle && this.particle['type'] === type) {
      this.particle.copy(particle)
      return
    }

    switch (type) {
      case Slot.TYPE_ENGINE:
        this.particle = new Engine().copy(particle)
        break
      case Slot.TYPE_GUN:
        this.particle = new Gun().copy(particle)
        break
    }
  }

  /**
   *
   * @returns {number}
   */
  static get TYPE_ENGINE() {
    return 1
  }

  /**
   *
   * @returns {number}
   */
  static get TYPE_GUN_TURRET() {
    return 2
  }

  /**
   *
   * @returns {number}
   */
  static get TYPE_GUN() {
    return 3
  }
}

export default Slot
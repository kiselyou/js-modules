import { Vector3 } from 'three'
import Particle from './../Particle'
import Engine from './Engine'
import Gun from './Gun'
import Armor from './Armor'
import Shell from './Shell'
import Listener from './../../helper/event/Listener'

class Slot extends Particle {
  /**
   * Есть разичные слоты и у каждого свое назанчение. т.е. каждый слот содержит информацию о сущности (сущности может и не быть)
   * Каждые слот можно идентифицировать по назначению. (Slot().type)
   * Например сущность Gun может быть в слоте со значением свойства new Slot().type равным Slot.TYPE_GUN и т.д.
   */
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

    /**
     *
     * @type {number}
     */
    this.status = Slot.STATUS_DISABLED
  }

  /**
   * @param {Slot} slot
   * @callback changeStatusEvent
   */

  /**
   *
   * @param {changeStatusEvent} callback
   * @returns {Slot}
   */
  onChangeStatus(callback) {
    Listener.on(this.id, callback)
    return this
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
   * @param {Vector3} v
   * @returns {Slot}
   */
  setPosition(v) {
    this.position.copy(v)
    return this
  }

  /**
   *
   * @param {number} value - constants of current class with prefix TYPE_...
   * @returns {Slot}
   */
  setType(value) {
    this.type = value
    return this
  }

  /**
   *
   * @param {number} value - constants of current class with prefix STATUS_...
   * @returns {Slot}
   */
  setStatus(value) {
    this.status = value
    Listener.emit(this.id, this)
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
            this.copyParticle(value)
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
   */
  copyParticle(particle) {
    if ( ! particle) {
      this.particle = null
      return
    }

    const entity = particle['entity']
    if (this.particle && this.particle['entity'] === entity) {
      this.particle.copy(particle)
      return
    }

    switch (entity) {
      case 'Engine':
        this.particle = new Engine().copy(particle)
        break
      case 'Gun':
        this.particle = new Gun().copy(particle)
        break
      case 'Armor':
        this.particle = new Armor().copy(particle)
        break
      case 'Shell':
        this.particle = new Shell().copy(particle)
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

  /**
   *
   * @returns {number}
   */
  static get TYPE_ARMOR() {
    return 4
  }

  /**
   *
   * @returns {number}
   */
  static get TYPE_SHELL() {
    return 5
  }

  /**
   *
   * @returns {number}
   */
  static get TYPE_ENERGY() {
    return 6
  }

  /**
   *
   * @returns {number}
   */
  static get STATUS_DISABLED() {
    return 0
  }

  /**
   *
   * @returns {number}
   */
  static get STATUS_ENABLED() {
    return 1
  }

  /**
   *
   * @returns {number}
   */
  static get STATUS_ACTIVE() {
    return 2
  }

  /**
   *
   * @returns {number}
   */
  static get STATUS_SELECTED() {
    return 3
  }
}

export default Slot
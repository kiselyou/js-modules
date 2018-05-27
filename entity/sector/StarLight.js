import uuidV4 from 'uuid/v4'
import { Vector3 } from 'three'
import * as CONST from './../../app/constants'

class StarLight {
  constructor() {
    /**
     * @type {string}
     */
    this.entity = this.constructor.name

    /**
     * @type {string}
     */
    this.id = uuidV4()

    /**
     * @type {number}
     */
    this.key = 1

    /**
     *
     * @type {Vector3}
     */
    this.position = new Vector3()

    /**
     *
     * @type {string}
     */
    this.textureKey = CONST.KEY_LIGHT_CONTROLS_1

    /**
     *
     * @type {Sprite|null}
     */
    this.sprite = null

    /**
     *
     * @type {number}
     */
    this.rotation = 0

    /**
     *
     * @type {boolean}
     */
    this.rotationEnabled = false
  }

  /**
   *
   * @param {string} value
   * @returns {StarLight}
   */
  setTextureKey(value) {
    this.textureKey = value
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {StarLight}
   */
  setRotationSpeed(value) {
    this.rotation = value
    this.enableRotation(true)
    return this
  }

  /**
   *
   * @param {boolean} value
   * @returns {StarLight}
   */
  enableRotation(value = true) {
    this.rotationEnabled = value
    return this
  }

  /**
   *
   * @param {number} key
   * @returns {StarLight}
   */
  setKey(key) {
    this.key = key
    return this
  }

  /**
   *
   * @param {string} id
   * @returns {StarLight}
   */
  setId(id) {
    this.id = id
    return this
  }

  /**
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {StarLight}
   */
  setPosition(x, y, z) {
    this.position.set(x, y, z)
    return this
  }

  /**
   *
   * @param {object} data
   * @returns {StarLight}
   */
  copy(data) {
    for (const property in data) {
      if (data.hasOwnProperty(property)) {
        switch (property) {
          case 'entity':
            break
          case 'position':
            this[property].copy(data[property])
            break
          default:
            this[property] = data[property]
            break
        }
      }
    }
    return this
  }

  /**
   *
   * @param {number} delta
   * @returns {void}
   */
  update(delta) {
    if (this.sprite && this.rotationEnabled) {
      this.sprite.material.rotation -= this.rotation
    }
  }
}

export default StarLight
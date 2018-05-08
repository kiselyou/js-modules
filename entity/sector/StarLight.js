import uuidV4 from 'uuid/v4'
import {Object3D, Vector3} from 'three'
import { LensFlare, LensFlareElement } from './../../app/three-dependense/LensFlare'
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
     * @type {Vector3}
     */
    this.rotation = new Vector3()

    /**
     *
     * @type {{enabled: boolean, textureKey: string, size: number}}
     */
    this.flare = {enabled: true, textureKey: CONST.KEY_LIGHT_CONTROLS_1, size: 20}

    /**
     *
     * @type {{enabled: boolean, textureKey: string, size: number}}
     */
    this.flareGlow = {enabled: false, textureKey: CONST.KEY_LIGHT_CONTROLS_2, size: 80}

    /**
     *
     * @type {Object3D|null}
     */
    this.flareElement = null
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
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {StarLight}
   */
  setRotation(x, y, z) {
    this.rotation.set(x, y, z)
    return this
  }

  /**
   *
   * @param {{[enabled]: boolean, [textureKey]: string, [size]: number}} options
   * @returns {StarLight}
   */
  setFlareOptions(options) {
    for (const property in options) {
      if (options.hasOwnProperty(property)) {
        this.flare[property] = options[property]
      }
    }
    return this
  }

  /**
   *
   * @param {{[enabled]: boolean, [textureKey]: string, [size]: number}} options
   * @returns {StarLight}
   */
  setFlareGlowOptions(options) {
    this.flareGlow.enabled = true
    for (const property in options) {
      if (options.hasOwnProperty(property)) {
        this.flareGlow[property] = options[property]
      }
    }
    return this
  }

  /**
   *
   * @param {Loader} loader
   * @returns {Object3D}
   */
  getFlare(loader) {
    if (!this.flareElement) {
      this.flareElement = new LensFlare()

      this.flareElement.position.copy(this.position)

      if (this.flare.enabled) {
        const texture = loader.getTexture(this.flare.textureKey)
        this.flareElement.addElement(new LensFlareElement(texture, this.flare.size, 0))
      }
      if (this.flareGlow.enabled) {
        const texture = loader.getTexture(this.flareGlow.textureKey)
        this.flareElement.addElement(new LensFlareElement(texture, this.flareGlow.size, 0))
      }
    }
    return this.flareElement
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

  update(delta) {
    if (this.flareElement) {

    }
  }
}

export default StarLight
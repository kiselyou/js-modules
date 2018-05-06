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
     * @type {{enabled: boolean, textureKey: string, size: number}}
     */
    this.flare = {enabled: true, textureKey: CONST.KEY_LIGHT_CONTROLS_1, size: 20}

    /**
     *
     * @type {{enabled: boolean, textureKey: string, size: number}}
     */
    this.flareGlow = {enabled: true, textureKey: CONST.KEY_LIGHT_CONTROLS_2, size: 80}
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
    let light = new Object3D()
    light.position.copy(this.position);

    const lensFlare = new LensFlare()
    if (this.flare.enabled) {
      const texture = loader.getTexture(this.flare.textureKey)
      lensFlare.addElement(new LensFlareElement(texture, this.flare.size, 0))
    }
    if (this.flareGlow.enabled) {
      const texture = loader.getTexture(this.flareGlow.textureKey)
      lensFlare.addElement(new LensFlareElement(texture, this.flareGlow.size, 0))
    }

    light.add(lensFlare)
    return light
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
}

export default StarLight
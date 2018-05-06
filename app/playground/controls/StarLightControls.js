import {Group, Object3D, Scene} from 'three'
import StarLight from '@entity/sector/StarLight'

class StarLightControls {
  /**
   *
   * @param {Group|Scene|Object3D} object
   */
  constructor(object) {

    /**
     *
     * @type {Group}
     */
    this.object = object

    /**
     *
     * @type {Array.<StarLight>}
     */
    this.lights = []
  }

  /**
   *
   * @param {Loader} loader
   * @returns {void}
   */
  async beforeStart(loader) {
    for (const light of this.lights) {
      const object3D = light.getFlare(loader)
      this.object.add(object3D)
    }
  }

  /**
   *
   * @param {Array} data
   * @returns {void}
   */
  copy(data) {
    for (const starLightData of data) {
      const light = new StarLight().copy(starLightData)
      this.lights.push(light)
    }
  }

  /**
   *
   * @param {number} delta
   * @returns {void}
   */
  update(delta) {

  }
}

export default StarLightControls
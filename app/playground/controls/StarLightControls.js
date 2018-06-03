import { AdditiveBlending, Group, Object3D, Scene, Sprite, SpriteMaterial } from 'three'
import StarLight from '@entity/particles-sector/StarLight'

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
      light.sprite = new Sprite()
      light.sprite.scale.set(50, 50, 50)
      light.sprite.position.copy(light.position)
      light.sprite.material = new SpriteMaterial({
        transparent: true,
        blending: AdditiveBlending,
        map: loader.getTexture(light.textureKey),
      })
      this.object.add(light.sprite)
    }
  }

  /**
   *
   * @param {Array.<StarLight>} data
   * @returns {void}
   */
  copy(data) {
    for (const light of data) {
      this.lights.push(light)
    }
  }

  /**
   *
   * @param {number} delta
   * @returns {void}
   */
  update(delta) {
    for (const light of this.lights) {
      light.update(delta)
    }
  }
}

export default StarLightControls
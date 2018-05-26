import {
  PointLight,
  Vector3,
  AmbientLight,
  HemisphereLight,
} from 'three'

class LightControls {
  /**
   *
   * @param {Scene} scene
   * @param {Loader} loader
   */
  constructor(scene, loader) {
    /**
     *
     * @type {Scene}
     */
    this.scene = scene

    /**
     *
     * @type {Loader}
     */
    this.loader = loader

    /**
     *
     * @type {boolean}
     */
    this.pointLightMoveWithModel = true

    /**
     *
     * @type {boolean}
     */
    this.hemisphereLightMoveWithModel = false

    /**
     *
     * @type {boolean}
     */
    this.ambientLightMoveWithModel = false

    /**
     *
     * @type {PointLight}
     */
    this.pointLight = new PointLight(0XFFFFFF, 2.5, 4000)
    this.pointLight.position.set(0, 0, 0)
    this.pointLight.castShadow = false

    /**
     *
     * @type {HemisphereLight}
     */
    this.hemisphereLight = new HemisphereLight(0xffffbb, 0x080820, 0.2)
    this.hemisphereLight.position.set(0, 0, 0)

    /**
     *
     * @type {AmbientLight}
     */
    this.ambientLight = new AmbientLight(0x111111)
    this.ambientLight.position.set(0, 0, 0)
  }

  /**
   *
   * @param {number} delta
   * @param {Vector3} v
   * @returns {void}
   */
  update(delta, v) {
    if (this.pointLightMoveWithModel) {
      this.pointLight.position.copy(v)
    }

    if (this.ambientLightMoveWithModel) {
      this.ambientLight.position.copy(v)
    }

    if (this.hemisphereLightMoveWithModel) {
      this.hemisphereLight.position.copy(v)
    }
  }
}

export default LightControls
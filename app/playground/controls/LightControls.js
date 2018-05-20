import {
  PointLight,
  Vector3,
  DirectionalLight,
  DirectionalLightHelper,
  PointLightHelper,
  AmbientLight,
  HemisphereLight,
  Object3D
} from 'three'
import { LensFlare, LensFlareElement } from '@app/three-dependense/LensFlare'
import * as CONST from '@app/constants'
import DebugPanel from '@app/debug/DebugPanel'

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
     * @type {Vector3}
     */
    this.position = new Vector3(0, 0, 0)

    /**
     *
     * @type {boolean}
     */
    this.pointLightMoveWithModel = false

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
    this.pointLight.position.copy(this.position)
    this.pointLight.castShadow = false

    /**
     *
     * @type {HemisphereLight}
     */
    this.hemisphereLight = new HemisphereLight(0xffffbb, 0x080820, 0.2)
    this.hemisphereLight.position.copy(this.position)

    /**
     *
     * @type {AmbientLight}
     */
    this.ambientLight = new AmbientLight(0x111111)
    this.ambientLight.position.copy(this.position)


    new DebugPanel()
      .addFolder('Point light controls')
      .add(this, 'pointLightMoveWithModel', 'Move with model')
      .add(this.pointLight, 'castShadow', 'Cast Shadow')
      .add(this.pointLight, 'decay', 'Decay', 0, 5)
      .add(this.pointLight, 'distance', 'Distance', 0, 8000)
      .add(this.pointLight, 'power', 'Power', 0, 1000)
      .add(this.pointLight, 'color', 'Color', null, null, true)
      .add(this.pointLight, 'intensity', 'Intensity', 0, 100)
      .add(this.pointLight.position, 'x', 'X', -2000, 2000)
      .add(this.pointLight.position, 'y', 'Y', -2000, 2000)
      .add(this.pointLight.position, 'z', 'Z', -2000, 2000)

      .addFolder('Hemisphere light controls')
      .add(this, 'hemisphereLightMoveWithModel', 'Move with model')
      .add(this.hemisphereLight, 'color', 'Sky Color', null, null, true)
      .add(this.hemisphereLight, 'groundColor', 'Ground Color', null, null, true)
      .add(this.hemisphereLight, 'intensity', 'Intensity', 0, 100)
      .add(this.hemisphereLight.position, 'x', 'X', -2000, 2000)
      .add(this.hemisphereLight.position, 'y', 'Y', -2000, 2000)
      .add(this.hemisphereLight.position, 'z', 'Z', -2000, 2000)

      .addFolder('Ambient light controls')
      .add(this, 'ambientLightMoveWithModel', 'Move with model')
      .add(this.ambientLight, 'color', 'Color', null, null, true)
      .add(this.ambientLight, 'intensity', 'Intensity', 0, 2)
      .add(this.ambientLight.position, 'x', 'X', -2000, 2000)
      .add(this.ambientLight.position, 'y', 'Y', -2000, 2000)
      .add(this.ambientLight.position, 'z', 'Z', -2000, 2000)
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
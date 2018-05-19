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

    /**
     *
     * @type {AmbientLight}
     */
    this.ambientLight = new AmbientLight(0x111111)

    /**
     *
     * @type {DirectionalLight}
     */
    this.light = new DirectionalLight(0xffffff, 2.25)
    this.light.position.set(200, 450, 500)
    this.light.castShadow = true
    this.light.shadow.mapSize.width = 1024
    this.light.shadow.mapSize.height = 512
    this.light.shadow.camera.near = 100
    this.light.shadow.camera.far = 1200
    this.light.shadow.camera.left = -1000
    this.light.shadow.camera.right = 1000
    this.light.shadow.camera.top = 350
    this.light.shadow.camera.bottom = -350
  }
}

export default LightControls
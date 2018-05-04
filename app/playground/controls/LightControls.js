import { PointLight, Vector3, DirectionalLight } from 'three'
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
    this.position = new Vector3(0, 1, 0)

    /**
     *
     * @type {DirectionalLight}
     */
    this.directionalLight = new DirectionalLight(0xffffff, 0.05)
    this.directionalLight.position.copy(this.position).normalize()
    this.directionalLight.castShadow = true
    this.scene.add(this.directionalLight)

    /**
     *
     * @type {PointLight}
     */
    this.pointLight = new PointLight(0XFFFFFF, 1, 4000)
    this.pointLight.position.copy(this.position)
    // this.pointLight.castShadow = false

    const textureFlare1 = this.loader.getTexture(CONST.KEY_LIGHT_CONTROLS_1)
    const textureFlare2 = this.loader.getTexture(CONST.KEY_LIGHT_CONTROLS_2)
    const lensFlare = new LensFlare()
    lensFlare.addElement(new LensFlareElement(textureFlare1, 1000, 0))
    lensFlare.addElement(new LensFlareElement(textureFlare2, 60, 0.6))
    lensFlare.addElement(new LensFlareElement(textureFlare2, 80, 0.7))
    lensFlare.addElement(new LensFlareElement(textureFlare2, 120, 0.9))
    lensFlare.addElement(new LensFlareElement(textureFlare2, 70, 1.0))

    this.pointLight.add(lensFlare)
    this.scene.add(this.pointLight)
  }
}

export default LightControls
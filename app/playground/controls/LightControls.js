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
     * @type {DirectionalLight}
     */
    // this.directionalLight = new DirectionalLight(0xffffff, 2.5)
    // this.directionalLight.position.copy(this.position)
    // this.directionalLight.castShadow = true
    //
    // const dirLight = new DirectionalLightHelper(this.directionalLight)

    // this.scene.add(dirLight)

    /**
     *
     * @type {PointLight}
     */
    this.pointLight = new PointLight(0XFFFFFF, 2.5, 4000)
    this.pointLight.position.copy(this.position)
    this.pointLight.castShadow = false

    // const textureFlare1 = this.loader.getTexture(CONST.KEY_LIGHT_CONTROLS_1)
    // const textureFlare2 = this.loader.getTexture(CONST.KEY_LIGHT_CONTROLS_2)
    // const lensFlare = new LensFlare()
    // lensFlare.addElement(new LensFlareElement(textureFlare1, 1000, 0))
    // lensFlare.addElement(new LensFlareElement(textureFlare2, 60, 0.6))
    // lensFlare.addElement(new LensFlareElement(textureFlare2, 80, 0.7))
    // lensFlare.addElement(new LensFlareElement(textureFlare2, 120, 0.9))
    // lensFlare.addElement(new LensFlareElement(textureFlare2, 70, 1.0))
    //
    // this.pointLight.add(lensFlare)







    const pLight = new PointLightHelper(this.pointLight, 5, 0XFFFFFF)

    this.scene.add(pLight)
    this.scene.add(this.pointLight)




/*
    // let light = new PointLight(0XFF0000, 0, 400)
    let light = new Object3D()
    light.position.copy(new Vector3(2000, 0, 200));

    const textureFlare1 = this.loader.getTexture(CONST.KEY_LIGHT_CONTROLS_1)
    const textureFlare2 = this.loader.getTexture(CONST.KEY_LIGHT_CONTROLS_2)
    const lensFlare = new LensFlare()
    lensFlare.addElement(new LensFlareElement(textureFlare1, 20, 0))
    lensFlare.addElement(new LensFlareElement(textureFlare2, 80, 0))

    // this.pointLight.add(lensFlare)
//

    // const pLight1 = new PointLightHelper(light, 5)
    // this.scene.add(pLight1)

    light.add(lensFlare)
    this.scene.add(light)*/





















    this.hemisphereLight = new HemisphereLight(0xffffbb, 0x080820, 0.2)
    this.scene.add(this.hemisphereLight)

    this.ambientLight = new AmbientLight(0x111111)
    this.scene.add(this.ambientLight)
  }
}

export default LightControls
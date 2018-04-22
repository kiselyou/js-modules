import { PointLight, Vector3, Group, Color, Math, AdditiveBlending } from 'three'
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
     * @type {Group}
     */
    this.group = new Group();

    this.light = new PointLight(0XFFFFFF, 1.4, 2000)
    this.light.color.setHSL(0.1, 0.4, 0.8)
    this.light.position.set(1200, 500, 2500)

    const textureFlare1 = this.loader.getTexture(CONST.KEY_LIGHT_CONTROLS_1)
    const textureFlare2 = this.loader.getTexture(CONST.KEY_LIGHT_CONTROLS_2)
    const lensFlare = new LensFlare()

    lensFlare.addElement(new LensFlareElement(textureFlare1, 1512, 0))
    lensFlare.addElement(new LensFlareElement(textureFlare2, 60, 0.6))
    lensFlare.addElement(new LensFlareElement(textureFlare2, 80, 0.7))
    lensFlare.addElement(new LensFlareElement(textureFlare2, 120, 0.9))
    lensFlare.addElement(new LensFlareElement(textureFlare2, 70, 1.0))

    lensFlare.customUpdateCallback = (object) => {
      let f
      let fl = object['lensFlares']['length']
      let flare
      const vecX = - object.positionScreen.x * 2
      const vecY = - object.positionScreen.y * 2
      for(f = 0; f < fl; f++) {
        flare = object['lensFlares'][f]
        flare.x = object.positionScreen.x + vecX * flare.distance
        flare.y = object.positionScreen.y + vecY * flare.distance
        flare.rotation = 0
      }
      object['lensFlares'][2].y += 0.025
      object['lensFlares'][3].rotation = object.positionScreen.x * 0.5 + Math.degToRad(45)
    }

    this.light.add(lensFlare)
    this.scene.add(this.light)
  }
}

export default LightControls
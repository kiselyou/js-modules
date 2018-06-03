import Planet from '@entity/particles-sector/Planet'
import ModelPlanetClouds from './ModelPlanetClouds'
import { MeshPhongMaterial, SphereGeometry, Color, Mesh } from 'three'
import { getGlowInsideMesh, getGlowOutsideMesh } from '../../../../shader/glow'

class ModelPlanet extends Planet {
  /**
   *
   * @param {Scene} scene
   * @param {Loader} loader
   */
  constructor(scene, loader) {
    super()

    /**
     *
     * @type {Scene}
     */
    this.scene = scene

    /**
     * @type {Loader}
     */
    this.loader = loader

    /**
     *
     * @type {ModelPlanetClouds}
     */
    this.modelClouds = new ModelPlanetClouds()

    /**
     *
     * @type {Mesh|null}
     */
    this.glowInsideModel = null

    /**
     *
     * @type {Mesh|null}
     */
    this.glowOutsideModel = null

    /**
     *
     * @type {Mesh}
     */
    this.model = new Mesh()

    /**
     *
     * @type {null}
     */
    this.parentModel = null
  }

  /**
   *
   * @returns {ModelPlanet}
   */
  buildModel() {
    this.model.geometry = new SphereGeometry(this.radius, this.segmentCount, this.segmentCount)
    this.model.material = new MeshPhongMaterial({
      map: this.getTextureMap(),
    })

    this.model.castShadow = true
    this.model.receiveShadow = true

    if (this.glowInsideOption.enabled) {
      this.glowInsideModel = getGlowInsideMesh(this.model, this.glowInsideOption)
      this.model.add(this.glowInsideModel)
    }

    if (this.glowOutsideOption.enabled) {
      this.glowOutsideModel = getGlowOutsideMesh(this.model, this.glowOutsideOption)
      this.model.add(this.glowOutsideModel)
    }

    this.scene.add(this.model)
    return this
  }

  /**
   *
   * @returns {ModelPlanet}
   */
  rebuildModel() {
    this.removeModel().buildModel()
    return this
  }

  /**
   *
   * @returns {ModelPlanet}
   */
  removeModel() {
    if (this.glowInsideOption.enabled) {
      this.model.remove(this.glowInsideModel)
    }

    if (this.glowOutsideOption.enabled) {
      this.model.remove(this.glowOutsideModel)
    }
    this.scene.remove(this.model)
    return this
  }

  /**
   *
   * @returns {Color}
   */
  getSpecular() {
    return new Color(this.textureMapSpecular)
  }

  /**
   *
   * @returns {number|?}
   */
  getBumpScale() {
    return this.textureBumpScale
  }

  /**
   *
   * @returns {Texture|?}
   */
  getTextureMap() {
    return this.loader.getTexture(this.textureMapKey)
  }

  /**
   *
   * @returns {Texture|?}
   */
  getTextureBump() {
    return this.loader.getTexture(this.textureBumpKey)
  }

  /**
   *
   * @param {Loader} loader
   * @returns {void}
   */
  async beforeStart(loader) {
    this.buildModel()
    this.calculatePosition(0)
  }

  /**
   *
   * @param {Object} data
   * @param {Array} [except]
   * @returns {ModelPlanet}
   */
  copy(data, except = []) {
    super.copy(data, except)
    return this
  }

  /**
   *
   * @param {number} delta
   * @returns {void}
   */
  update(delta) {
    this.calculatePosition(delta)
    this.model.rotation.y -= 0.05 * delta
    if (this.modelClouds.enabled) {
      this.modelClouds.update(delta)
    }
  }

  /**
   *
   * @param {number} delta
   * @returns {ModelPlanet}
   */
  calculatePosition(delta = 1) {
    let x = 0, z = 0;
    if (this.parentModel) {
      x = this.parentModel.model.position.x
      z = this.parentModel.model.position.z
    }

    this.angleToCenter += this.speedMove * delta
    this.model.position.setX(x + this.distanceToCenter * Math.cos(this.angleToCenter))
    this.model.position.setZ(z + this.distanceToCenter * Math.sin(this.angleToCenter))
    return this
  }

  /**
   *
   * @param {Intersect} intersect
   * @param {MouseEvent} mouseEvent
   * @returns {void}
   */
  updateTooltip(intersect, mouseEvent) {

  }

  /**
   *
   * @param {Intersect} intersect
   * @param {MouseEvent} mouseEvent
   * @returns {void}
   */
  onClick(intersect, mouseEvent) {

  }
}

export default ModelPlanet
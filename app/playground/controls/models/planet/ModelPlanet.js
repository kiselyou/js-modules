import Planet from '@entity/particles-sector/Planet'
import Model from './../Model'
import { MeshPhongMaterial, SphereGeometry, Color, Mesh } from 'three'
import { getGlowInsideMesh, getGlowOutsideMesh } from '../../../../shader/glow'

class ModelPlanet extends Planet {
  /**
   *
   * @param {Loader} loader
   */
  constructor(loader) {
    super()

    /**
     * @type {Loader}
     */
    this.loader = loader

    /**
     *
     * @type {Model}
     */
    this.model = new Model(1000)

    /**
     *
     * @type {Mesh|?}
     */
    this.glowInsideModel = null

    /**
     *
     * @type {Mesh|?}
     */
    this.glowOutsideModel = null

    /**
     *
     * @type {Mesh}
     */
    this.mesh = new Mesh()

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
    this.mesh.geometry = new SphereGeometry(this.radius, this.segmentCount, this.segmentCount)
    this.mesh.material = new MeshPhongMaterial({
      map: this.getTextureMap(),
    })

    this.mesh.castShadow = true
    this.mesh.receiveShadow = true

    if (this.glowInsideOption.enabled) {
      this.glowInsideModel = getGlowInsideMesh(this.mesh, this.glowInsideOption)
      this.mesh.add(this.glowInsideModel)
    }

    if (this.glowOutsideOption.enabled) {
      this.glowOutsideModel = getGlowOutsideMesh(this.mesh, this.glowOutsideOption)
      this.mesh.add(this.glowOutsideModel)
    }

    this.model.build(this.mesh, this.id)
    this.model.setReference(this)
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
      this.mesh.remove(this.glowInsideModel)
    }

    if (this.glowOutsideOption.enabled) {
      this.mesh.remove(this.glowOutsideModel)
    }
    this.model.remove(this.mesh)
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
    this.setCategoryName('Planet')
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
}

export default ModelPlanet
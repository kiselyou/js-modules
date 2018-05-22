import Planet from '@entity/sector/Planet'
import ModelPlanetClouds from './ModelPlanetClouds'
import { MeshPhongMaterial, SphereGeometry, Color } from 'three'
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
    this.glowInside = null

    /**
     *
     * @type {Mesh|null}
     */
    this.glowOutside = null
  }

  /**
   *
   * @returns {void}
   */
  buildMesh() {
    const radius = this.params.radius
    const segments = this.params.segments
    this.model.geometry = new SphereGeometry(radius, segments, segments)
    this.model.material = new MeshPhongMaterial({
      map: this.getTextureMap(),
      // bumpScale: this.getBumpScale(),
      // bumpMap: this.getTextureBump(),
      // specularMap: this.getTextureSpec(),
      // specular: this.getSpecular(),
    })

    this.model.castShadow = true
    this.model.receiveShadow = true

    if (this.glow.inside.enabled) {
      this.glowInside = getGlowInsideMesh(this.model, this.glow.inside)
      this.model.add(this.glowInside)
    }

    if (this.glow.outside.enabled) {
      this.glowOutside = getGlowOutsideMesh(this.model, this.glow.outside)
      this.model.add(this.glowOutside)
    }

    if (this.isClouds()) {
      // this.model.add(
      //   this.modelClouds.getMeshClouds(
      //     radius,
      //     this.params.segments,
      //     this.getImageCloudMap(),
      //     this.getImageCloudMapTrans()
      //   )
      // )
    }

    this.scene.add(this.model)
  }

  isClouds() {
    return this.params.texturesKey.cloudMap && this.params.texturesKey.cloudMapTrans
  }

  /**
   *
   * @returns {Color}
   */
  getSpecular() {
    return new Color(this.params.texturesKey.specular)
  }

  /**
   *
   * @returns {number|?}
   */
  getBumpScale() {
    return this.params.texturesKey.bump.scale
  }

  /**
   *
   * @returns {Texture|?}
   */
  getTextureMap() {
    return this.loader.getTexture(this.params.texturesKey.map)
  }

  /**
   *
   * @returns {Texture|?}
   */
  getTextureBump() {
    return this.loader.getTexture(this.params.texturesKey.bump.key)
  }

  /**
   *
   * @returns {Texture|?}
   */
  getTextureSpec() {
    return this.loader.getTexture(this.params.texturesKey.spec)
  }

  /**
   *
   * @returns {HTMLImageElement|?}
   */
  getImageCloudMap() {
    return this.loader.getImage(this.params.texturesKey.cloudMap)
  }

  /**
   *
   * @returns {HTMLImageElement|?}
   */
  getImageCloudMapTrans() {
    return this.loader.getImage(this.params.texturesKey.cloudMapTrans)
  }

  /**
   *
   * @param {Loader} loader
   * @returns {void}
   */
  async beforeStart(loader) {
    this.buildMesh()
  }

  /**
   *
   * @param {object} data
   * @returns {ModelPlanet}
   */
  copy(data) {
    super.copy(data)
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
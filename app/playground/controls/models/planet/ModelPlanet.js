import Planet from '@entity/sector/Planet'
import ModelPlanetClouds from './ModelPlanetClouds'
import { Mesh, Group, MeshPhongMaterial, SphereGeometry, Color } from 'three'
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
     * @type {Mesh}
     */
    this.planet = new Mesh()

    /**
     *
     * @type {Group}
     */
    this.group = new Group()

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
  }

  /**
   *
   * @returns {void}
   */
  buildMesh() {
    const radius = this.params.radius
    const segments = this.params.segments
    this.planet.geometry = new SphereGeometry(radius, segments, segments)
    this.planet.material = new MeshPhongMaterial({
      map: this.getTextureMap(),
      bumpScale: this.getBumpScale(),
      bumpMap: this.getTextureBump(),
      specularMap: this.getTextureSpec(),
      specular: this.getSpecular(),
    })

    this.planet.castShadow = true
    this.planet.receiveShadow = true
    this.group.position.copy(this.position)
    this.group.add(this.planet)

    if (this.glow.inside.enabled) {
      const meshGlow = getGlowInsideMesh(this.planet, this.glow.inside)
      this.group.add(meshGlow)
    }

    if (this.glow.outside.enabled) {
      const meshGlow = getGlowOutsideMesh(this.planet, this.glow.outside)
      this.group.add(meshGlow)
    }

    if (this.isClouds()) {
      this.group.add(
        this.modelClouds.getMeshClouds(
          radius,
          this.params.segments,
          this.getImageCloudMap(),
          this.getImageCloudMapTrans()
        )
      )
    }

    this.scene.add(this.group)
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
    if (this.planet) {
      this.calculatePosition(delta)
      this.group.position.copy(this.position)
      this.planet.rotation.y -= 0.05 * delta

      if (this.modelClouds.enabled) {
        this.modelClouds.update(delta)
      }
    }
  }
}

export default ModelPlanet
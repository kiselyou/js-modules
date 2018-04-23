import Planet from '@entity/sector/Planet'
import ModelPlanetClouds from './ModelPlanetClouds'
import { Mesh, Group, MeshPhongMaterial, SphereGeometry, Color } from 'three'

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
    this.modelClouds = new ModelPlanetClouds(this)
  }

  /**
   *
   * @returns {void}
   */
  buildMesh() {
    const segments = this.params.segments
    this.planet.geometry = new SphereGeometry(this.params.radius, segments, segments)

    this.planet.material = new MeshPhongMaterial({
      map: this.getTextureMap(),
      bumpScale: this.params.texturesKey.bump ? 0.1 : null,
      bumpMap: this.getTextureBump(),
      specularMap: this.getTextureSpec(),
      specular: new Color(0xDDFFFD),
    });

    if (this.params.texturesKey.cloudMap && this.params.texturesKey.cloudMapTrans) {
      this.modelClouds.buildClouds()
    }

    this.planet.castShadow = true
    this.planet.receiveShadow = true
    this.group.position.copy(this.position)
    this.group.add(this.planet)
    this.scene.add(this.group)
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
    return this.loader.getTexture(this.params.texturesKey.bump)
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
   * @returns {Image|?}
   */
  getImageCloudMap() {
    return this.loader.getImage(this.params.texturesKey.cloudMap)
  }

  /**
   *
   * @returns {Image|?}
   */
  getImageCloudMapTrans() {
    return this.loader.getImage(this.params.texturesKey.cloudMapTrans)
  }

  /**
   *
   * @param {object} data
   * @returns {ModelPlanet}
   */
  copy(data) {
    super.copy(data)
    this.buildMesh()
    return this
  }

  /**
   *
   * @param {number} delta
   * @returns {void}
   */
  update(delta) {
    if (this.planet) {
      this.planet.rotation.x += 0.009 * delta
      this.planet.rotation.y += 0.009 * delta
      this.planet.rotation.y += 0.009 * delta

      if (this.modelClouds.enabled) {
        this.modelClouds.update(delta)
      }
    }
  }
}

export default ModelPlanet
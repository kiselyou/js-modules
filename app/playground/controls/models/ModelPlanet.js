import Planet from '@entity/sector/Planet'
import ModelPlanetClouds from './ModelPlanetClouds'
import { Mesh, MeshPhongMaterial, SphereGeometry, Color } from 'three'

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
      map: this.loader.getTexture(this.params.texturesKey.map),
      bumpScale: this.params.texturesKey.bump ? 0.2 : null,
      bumpMap: this.loader.getTexture(this.params.texturesKey.bump) || null,
      specularMap: this.loader.getTexture(this.params.texturesKey.spec) || null,
      specular: new Color('grey'),
    });

    if (this.params.texturesKey.cloudMap && this.params.texturesKey.cloudMapTrans) {
      this.modelClouds.buildClouds()
      // this._planetClouds = this._buildClouds();
      // this._planet.add(this._planetClouds);
    }

    this.planet.position.copy(this.position)
    this.planet.castShadow = true
    this.planet.receiveShadow = true
    this.scene.add(this.planet)
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
      this.planet.rotation.x += 0.001// * delta
      this.planet.rotation.y += 0.002// * delta

      if (this.modelClouds.enabled) {
        this.modelClouds.update(delta)
      }
    }
  }
}

export default ModelPlanet
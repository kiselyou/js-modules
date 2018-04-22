import Planet from '@entity/sector/Planet'
import { Mesh, MeshStandardMaterial, SphereGeometry } from 'three'

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
    this.model = new Mesh()

    /**
     *
     * @type {Scene}
     */
    this.scene = scene

    /**
     * @type {Loader}
     */
    this.loader = loader
  }

  /**
   *
   * @returns {void}
   */
  buildMesh() {
    const segments = this.params.segments
    this.model.geometry = new SphereGeometry(this.params.radius, segments, segments)

    this.model.material = new MeshStandardMaterial({
      map: this.loader.getTexture(this.params.texturesKey.map),
    });

    this.model.position.copy(this.position)
    this.model.castShadow = true
    this.model.receiveShadow = true
    this.scene.add(this.model)
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
    if (this.model) {
      this.model.rotation.x += 0.001
      this.model.rotation.y += 0.002
    }
  }
}

export default ModelPlanet
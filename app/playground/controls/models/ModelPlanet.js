import Planet from '@entity/sector/Planet'
import { Mesh, MeshNormalMaterial, SphereGeometry } from "three";

class ModelPlanet extends Planet {
  constructor(scene) {
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
  }

  /**
   *
   * @returns {void}
   */
  buildMesh() {
    const segments = this.params.segments
    this.model.geometry = new SphereGeometry(this.params.radius, segments, segments)
    this.model.material = new MeshNormalMaterial()
    this.model.position.copy(this.position)
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
      this.model.rotation.x += 0.01
      this.model.rotation.y += 0.02
    }
  }
}

export default ModelPlanet
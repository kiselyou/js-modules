import Station from '@entity/station/Station'
import { Mesh, MeshPhongMaterial, BoxGeometry } from 'three'

class ModelStation extends Station {
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
    this.element = new Mesh()

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
    this.element.geometry = new BoxGeometry(2, 2, 2)
    this.element.material = new MeshPhongMaterial()
    this.element.castShadow = true
    this.element.receiveShadow = true
    this.element.position.copy(this.position)
    this.scene.add(this.element)
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
   * @returns {ModelStation}
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
    this.element.position.copy(this.position)
  }
}

export default ModelStation
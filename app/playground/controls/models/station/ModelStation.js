import { MeshBasicMaterial, SphereGeometry } from 'three'
import Station from '@entity/particles-sector/Station'
import DetectObject3D from '@helper/DetectObject3D'
import * as CONST from '@app/constants'
import Model from './../Model'

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
     * @type {Scene}
     */
    this.scene = scene

    /**
     * @type {Loader}
     */
    this.loader = loader

    /**
     *
     * @type {Model}
     */
    this.model = new Model()
  }

  /**
   *
   * @returns {void}
   */
  buildMesh() {
    const model3D = this.loader.getModel(CONST.KEY_STATION_2)
    const maxSize = DetectObject3D.maxSize(model3D)

    this.model.material = new MeshBasicMaterial({ transparent: true, opacity: 0.05 })
    this.model.geometry = new SphereGeometry(maxSize, 25, 25)

    this.model.add(model3D)

    this.scene.add(this.model)
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
   * @param {Object} data
   * @param {Array} [except]
   * @returns {ModelStation}
   */
  copy(data, except = []) {
    super.copy(data, except)
    return this
  }

  /**
   *
   * @param {number} delta
   * @returns {ModelStation}
   */
  calculatePosition(delta = 1) {
    this.angleToCenter += this.speedMove * delta
    this.model.position.setX(this.distanceToCenter * Math.cos(this.angleToCenter))
    this.model.position.setZ(this.distanceToCenter * Math.sin(this.angleToCenter))
    return this
  }

  /**
   *
   * @param {number} delta
   * @returns {void}
   */
  update(delta) {
    this.calculatePosition(delta)
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

export default ModelStation
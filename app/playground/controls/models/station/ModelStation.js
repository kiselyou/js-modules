import Station from '@entity/station/Station'
import { MeshBasicMaterial, SphereGeometry } from 'three'
import DetectObject3D from '@helper/DetectObject3D'
import * as CONST from '@app/constants'

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
     * @type {number}
     */
    this.maxSize = 0;
  }

  /**
   *
   * @returns {void}
   */
  buildMesh() {
    const model3D = this.loader.getModel(CONST.KEY_STATION_2)
    this.maxSize = DetectObject3D.maxSize(model3D)

    this.model.material = new MeshBasicMaterial({ transparent: true, opacity: 0.05 })
    this.model.geometry = new SphereGeometry(this.maxSize, 25, 25)

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
import Station from '@entity/station/Station'
import MouseTooltip from '@helper/MouseTooltip'
import EventControls from './../../EventControls'
import { Object3D } from 'three'
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
     * @type {Object3D}
     */
    this.model = new Object3D()

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
     * @type {MouseTooltip}
     */
    this.tooltip = new MouseTooltip()

    /**
     *
     * @type {EventControls}
     */
    this.eventControls = new EventControls()
  }

  /**
   *
   * @returns {void}
   */
  buildMesh() {
    const model3D = this.loader.getModel(CONST.KEY_STATION_2)
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
    this.model.position.copy(this.position)
  }

  /**
   *
   * @param {Intersect} intersect
   * @param {MouseEvent} mouseEvent
   * @returns {void}
   */
  updateTooltip(intersect, mouseEvent) {
    const isIntersect = intersect.is(this.model)
    if (isIntersect) {
      this.eventControls.ifNotActive('updateTooltip', () => {
        const y = DetectObject3D.maxSize(this.element) + 2
        this.scene.add(
          this.tooltip
            .setPosition(this.position.x, y, this.position.z)
            .write(this.name)
            .getSprite()
        )
      })
    } else {
      this.eventControls.ifActive('updateTooltip', () => {
        this.scene.remove(this.tooltip.getSprite())
      })
    }
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
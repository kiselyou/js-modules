import Asteroid from '@entity/sector/Asteroid'
import {BoxGeometry, Mesh, MeshPhongMaterial} from 'three'
import MouseTooltip from '@helper/MouseTooltip'
import EventControls from './../../EventControls'
import DetectObject3D from "@helper/DetectObject3D";

class ModelAsteroid extends Asteroid {
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
    this.element.geometry = new BoxGeometry(6, 6, 6)
    this.element.material = new MeshPhongMaterial({color: 0xFF0000})
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
   * @returns {ModelAsteroid}
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

  /**
   *
   * @param {Intersect} intersect
   * @param {MouseEvent} mouseEvent
   * @returns {void}
   */
  updateTooltip(intersect, mouseEvent) {
    const isIntersect = intersect.is(this.element)
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
}

export default ModelAsteroid
import RaceControls from './RaceControls'
import Player from '@entity/sector/Player'
import MoveCalculator from '@helper/move/MoveCalculator'
import { Mesh, BoxGeometry, MeshPhongMaterial, Vector3 } from 'three'
import * as CONST from '@app/constants'

class PlayerControls {
  /**
   *
   * @param {Scene} scene
   * @param {Loader} loader
   */
  constructor(scene, loader) {
    /**
     * @type {Scene}
     */
    this.scene = scene

    /**
     *
     * @type {Loader}
     */
    this.loader = loader

    /**
     *
     * @type {Player}
     */
    this.player = new Player()

    /**
     *
     * @type {RaceControls}
     */
    this.raceControls = new RaceControls()

    /**
     *
     * @type {MoveCalculator}
     */
    this.moveCalculator = new MoveCalculator()

    /**
     *
     * @type {Mesh}
     */
    this.element = new Mesh()
  }

  /**
   *
   * @returns {void}
   */
  buildMesh() {

    this.element = this.loader.getModel(CONST.KEY_SPACESHIP_3)

    // this.element.geometry = new BoxGeometry(12, 12, 12)
    // this.element.material = new MeshPhongMaterial({ color: 0x00FFFF })
    // this.element.castShadow = true
    // this.element.receiveShadow = true
    this.element.position.copy(this.player.position)


    this.moveCalculator
      .setPosition(this.player.position)
      .setTarget(new Vector3(1000, 0, -500))
      .startCalculate()

    setTimeout(() => {
      this.moveCalculator.startMoving()
    }, 2000)


    this.scene.add(this.element)
  }

  /**
   * @returns {void}
   */
  async beforeStart() {
    await this.buildMesh()
    await this.raceControls.beforeStart()
  }

  /**
   *
   * @param {Object} data
   * @returns {PlayerControls}
   */
  copy(data) {
    this.player.copy(data.player)
    return this
  }

  /**
   *
   * @param {number} delta
   * @returns {void}
   */
  update(delta) {
    this.moveCalculator.update(delta, this.element)
    this.player.position.copy(this.element.position)
  }

  /**
   *
   * @param {Intersect} intersect
   * @param {MouseEvent} mouseEvent
   * @returns {void}
   */
  updateTooltip(intersect, mouseEvent) {

  }
}

export default PlayerControls
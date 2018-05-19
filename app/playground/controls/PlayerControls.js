import RaceControls from './RaceControls'
import Player from '@entity/sector/Player'
import MoveCalculator from '@helper/move/MoveCalculator'
import { Mesh, BoxGeometry, MeshPhongMaterial, Object3D, Vector3 } from 'three'
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
     * @type {Object3D}
     */
    this.model = new Object3D()
  }

  /**
   *
   * @returns {void}
   */
  buildMesh() {

    const model3D = this.loader.getModel(CONST.KEY_SPACESHIP_3)
    this.model.add(model3D)
    this.model.position.copy(this.player.position)


    setTimeout(() => {
      console.log(this.model.position)
      console.log(model3D.position)
    }, 2000)

    // this.moveCalculator
    //   .setPosition(this.player.position)
    //   .setTarget(new Vector3(1000, 0, -500))
    //   .startCalculate()
    //
    // setTimeout(() => {
    //   this.moveCalculator.startMoving()
    // }, 2000)


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
    this.moveCalculator.update(delta, this.model)
    this.player.position.copy(this.model.position)
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
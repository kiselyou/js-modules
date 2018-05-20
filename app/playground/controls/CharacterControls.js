import RaceControls from './RaceControls'
import MoveControls from './MoveControls'
import Player from '@entity/sector/Player'
import * as CONST from '@app/constants'
import DebugPanel from '@app/debug/DebugPanel'

class CharacterControls extends MoveControls {
  /**
   *
   * @param {Scene} scene
   * @param {Loader} loader
   */
  constructor(scene, loader) {
    super()

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
     * @type {boolean}
     */
    this.enabled = false

    const panel = new DebugPanel()
      .addFolder('Ship Controls')
      .add(this, 'enabled', 'Controls enabled')
      .open()
      .addFolder('Ship Info')
      .add(this, 'speed', 'Ship Speed')
      .add(this.model.position, 'x', 'Ship X')
      .add(this.model.position, 'y', 'Ship Y')
      .add(this.model.position, 'z', 'Ship Z')
      .addFolder('Ship speed')
      .add(this, 'maxSpeed', 'Max', 10, 400)
      .add(this, 'maxReverseSpeed', 'Max Reverse', -200, 0)
      .add(this, 'angularSpeed', 'Angular Speed', 0.01, 5)
      .add(this, 'acceleration', 'Acceleration', 10, 500)
      .add(this, 'deceleration', 'Deceleration', 10, 500)

    setTimeout(() => {
      panel
        .addFolder('Scale')
        .add(this.model.children[1].scale, 'x', 'Scale X', 0, 5)
        .add(this.model.children[1].scale, 'y', 'Scale Y', 0, 5)
        .add(this.model.children[1].scale, 'z', 'Scale Z', 0, 5)
    }, 5000)

  }

  /**
   *
   * @returns {void}
   */
  buildMesh() {
    const model3D = this.loader.getModel(CONST.KEY_SPACESHIP_3)
    this.model.add(model3D)
    this.model.position.copy(this.player.position)
  }

  /**
   * @returns {void}
   */
  async beforeStart() {
    await this.raceControls.beforeStart()
    await this.buildMesh()
    this.enabled = true
  }

  /**
   *
   * @param {Object} data
   * @returns {CharacterControls}
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
    if (this.enabled) {
      super.update(delta)
      this.player.position.copy(this.model.position)
    }
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

export default CharacterControls
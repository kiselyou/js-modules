import RaceControls from './RaceControls'
import MoveControls from './MoveControls'
import Player from '@entity/sector/Player'

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
  }

  /**
   *
   * @returns {void}
   */
  buildMesh() {
    const model3D = this.loader.getModel(this.player.modelKey)
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
    this.player.copy(data)
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
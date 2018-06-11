import RaceControls from './RaceControls'
import ModelSpaceship from './models/spaceship/ModelSpaceship'
import ParticlePlayGround from '@entity/ParticlePlayGround'
import Player from '@entity/particles-sector/Player'
import ShotControls from './ShotControls'

class CharacterControls extends ModelSpaceship {
  /**
   *
   * @param {Scene} scene
   * @param {Loader} loader
   */
  constructor(scene, loader) {
    super(scene, loader)

    /**
     *
     * @type {RaceControls}
     */
    this.raceControls = new RaceControls()

    /**
     *
     * @type {ShotControls}
     */
    this.shotCcntrols = new ShotControls()

    /**
     *
     * @type {Player}
     */
    this.player = new Player()

    /**
     *
     * @type {boolean}
     */
    this.enabled = false
  }

  /**
   * @returns {void}
   */
  async beforeStart() {
    await super.beforeStart()
    await this.raceControls.beforeStart()
    this.mesh.position.copy(this.player.position)
    this.enabled = true
  }

  /**
   *
   * @param {Player|Object} data
   * @returns {CharacterControls}
   */
  copyPlayer(data) {
    this.player.copy(data)
    return this
  }

  /**
   * Before call this method - Player must be set
   *
   * @param {ParticlePlayGround} data
   * @returns {ModelSpaceship}
   */
  copy(data) {
    super.copy(data)
    this.spaceship.copy(data.getPlayerSpaceship(this.player))
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
      this.player.position.copy(this.mesh.position)
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
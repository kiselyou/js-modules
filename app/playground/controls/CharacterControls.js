import RaceControls from './RaceControls'
import ModelSpaceship from './models/spaceship/ModelSpaceship'
import ParticlePlayGround from '@entity/ParticlePlayGround'
import Player from '@entity/particles-sector/Player'
import ShotControls from './ShotControls'
import Calculate from './../lib/Calculate'
import Slot from "@entity/particles-spaceship/Slot";

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
    this.shotControls = new ShotControls(this)

    /**
     *
     * @type {Calculate}
     */
    this.calculate = new Calculate()

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
   * Get position of aim in world
   *
   * @returns {Vector3}
   */
  getTargetPosition() {
    return this.calculate.getNextPosition(this, this.aim.position.z)
  }

  /**
   * Get ships direction
   *
   * @returns {Vector3}
   */
  getDirection() {
    return this.calculate.getDirection(this)
  }

  /**
   * @returns {void}
   */
  async beforeStart() {
    await super.beforeStart()
    await this.raceControls.beforeStart()
    this.position.copy(this.player.position)
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
      this.shotControls.update(delta)
      this.player.position.copy(this.position)
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

  /**
   *
   * @param {Intersect} intersect
   * @param {MouseEvent} mouseEvent
   * @returns {void}
   */
  onMouseClick(intersect, mouseEvent) {
    const target = this.getTargetPosition()
    //TODO: temp solution
    const guns = this.spaceship.getSlotsByType(Slot.TYPE_GUN)
    for (const gun of guns) {
      this.shotControls.shot(gun.id, target)
    }
  }
}

export default CharacterControls
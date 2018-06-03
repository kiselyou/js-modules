import RaceControls from './RaceControls'
import ModelSpaceship from './models/spaceship/ModelSpaceship'
import ParticlePlayGround from '@entity/ParticlePlayGround'

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
     * @type {boolean}
     */
    this.enabled = false
  }

  /**
   * @returns {void}
   */
  async beforeStart() {
    await super.beforeStart()
    this.enabled = true
    await this.raceControls.beforeStart()
  }

  /**
   *
   * @param {Player} player
   * @param {ParticlePlayGround} data
   * @returns {ModelSpaceship}
   */
  copy(player, data) {
    super.copy(player, data)
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
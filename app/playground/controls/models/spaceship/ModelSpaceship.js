import Player from '@entity/particles-sector/Player'
import Spaceship from '@entity/particles-spaceship/Spaceship'
import MoveControls from './../../MoveControls'

class ModelSpaceship extends MoveControls {
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
     * @type {null|Group}
     */
    this.model = null
  }

  /**
   * @returns {void}
   */
  async beforeStart() {
    this.buildModel()
    await super.beforeStart()
    this.mesh.position.copy(this.player.position)
  }

  /**
   *
   * @returns {ModelSpaceship}
   */
  buildModel() {
    this.removeModel()
    this.model = this.loader.getModel(this.spaceship.modelKey)
    this.mesh.add(this.model)
    return this
  }

  /**
   *
   * @returns {ModelSpaceship}
   */
  removeModel() {
    if (this.model) {
      this.mesh.remove(this.model)
    }
    return this
  }

  /**
   *
   * @param {Player} player
   * @param {ParticlePlayGround} data
   * @returns {ModelSpaceship}
   */
  copy(player, data) {
    this.player.copy(player)
    this.spaceship.copy(data.getSpaceshipById(this.player.spaceshipId))
    return this
  }

  /**
   *
   * @param {number} delta
   * @returns {void}
   */
  update(delta) {
    super.update(delta)
    this.player.position.copy(this.mesh.position)
  }
}

export default ModelSpaceship
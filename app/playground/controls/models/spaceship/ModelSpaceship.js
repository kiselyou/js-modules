import Player from '@entity/particles-sector/Player'
import Spaceship from '@entity/particles-spaceship/Spaceship'

import MoveControls from './../../MoveControls'
import ParticlePlayGround from '@entity/ParticlePlayGround'


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
     * @type {Spaceship}
     */
    this.spaceship = new Spaceship()

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
  }

  /**
   *
   * @returns {ModelSpaceship}
   */
  buildModel() {
    this.removeModel()
    this.model = this.loader.getModel(this.player.modelKey)
    this.mesh.add(this.model)
    this.mesh.position.copy(this.player.position)
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
   * @param {Player} data
   * @returns {ModelSpaceship}
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
    super.update(delta)
    this.player.position.copy(this.mesh.position)
  }
}

export default ModelSpaceship
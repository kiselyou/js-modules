import Player from '@entity/particles-sector/Player'
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
   * @param {ParticlePlayGround} data
   * @returns {ModelSpaceship}
   */
  copy(data) {

    return this
  }

  /**
   *
   * @param {number} delta
   * @returns {void}
   */
  update(delta) {
    super.update(delta)
  }
}

export default ModelSpaceship
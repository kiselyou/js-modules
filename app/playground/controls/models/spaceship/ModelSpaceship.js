import MoveControls from './../../MoveControls'
import Player from '@entity/sector/Player'

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
    this.activeModel = null
  }

  /**
   *
   * @returns {ModelSpaceship}
   */
  setModel() {
    this.removeModel()
    this.activeModel = this.loader.getModel(this.player.modelKey)
    this.model.add(this.activeModel)
    this.model.position.copy(this.player.position)
    return this
  }

  /**
   *
   * @returns {ModelSpaceship}
   */
  removeModel() {
    if (this.activeModel) {
      this.model.remove(this.activeModel)
    }
    return this
  }

  /**
   *
   * @param {Object} data
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
    this.player.position.copy(this.model.position)
  }
}

export default ModelSpaceship
import Spaceship from '@entity/particles-spaceship/Spaceship'
import Player from '@entity/particles-sector/Player'
import MoveControls from './../../MoveControls'
import Model from './../Model'

class ModelSpaceship extends Player {
  /**
   *
   * @param {Playground} playground
   */
  constructor(playground) {
    super()

    /**
     *
     * @type {Playground}
     */
    this.playground = playground

    /**
     * @type {Scene}
     */
    this.scene = this.playground.scene

    /**
     *
     * @type {Loader}
     */
    this.loader = this.playground.loader

    /**
     *
     * @type {Model}
     */
    this.model = new Model()

    /**
     *
     * @type {Spaceship}
     */
    this.spaceship = new Spaceship()

    /**
     *
     * @type {MoveControls}
     */
    this.moveControls = new MoveControls(this.model, this.spaceship)
  }

  /**
   *
   * @returns {Engine|?}
   */
  getEngine() {
    return this.spaceship.getEngine()
  }

  /**
   *
   * @returns {Shell|?}
   */
  getShell() {
    return this.spaceship.getShell()
  }

  /**
   *
   * @returns {Energy|?}
   */
  getEnergy() {
    return this.spaceship.getEnergy()
  }

  /**
   *
   * @returns {Armor|?}
   */
  getArmor() {
    return this.spaceship.getArmor()
  }

  /**
   * @returns {void}
   */
  async beforeStart() {
    await this.buildModel()
  }

  /**
   *
   * @returns {ModelSpaceship}
   */
  buildModel() {
    const shell = this.spaceship.getShell()
    const model = this.loader.getModel(shell.modelKey)
    this.model.build(model, this.id)
    this.model.position.copy(this.position)
    return this
  }

  /**
   *
   * @returns {ModelSpaceship}
   */
  removeModel() {
    this.scene.remove(this.model)
    return this
  }

  /**
   *
   * @param {Player|Object} data
   * @param {Array} [except]
   * @returns {ModelSpaceship}
   */
  copy(data, except = []) {
    super.copy(data, except)
    return this
  }

  /**
   *
   * @param {number} delta
   * @returns {void}
   */
  update(delta) {
    this.moveControls.update(delta)
    this.position.copy(this.model.position)
  }
}

export default ModelSpaceship
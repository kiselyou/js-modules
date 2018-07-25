import Spaceship from '@entity/particles-spaceship/Spaceship'
import Player from '@entity/particles-sector/Player'
import Calculate from './../../../lib/Calculate'
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
    this.model = new Model(5)

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

    /**
     *
     * @type {Calculate}
     */
    this.calculate = new Calculate()
  }

  /**
   * Get position of aim in world
   *
   * @param {number} [distance]
   * @returns {Vector3}
   */
  getNextPosition(distance = 150) {
    return this.calculate.getNextPosition(this.model, distance)
  }

  /**
   * Get ships direction
   *
   * @returns {Vector3}
   */
  getDirection() {
    return this.calculate.getDirection(this.model)
  }

  /**
   *
   * @param {Vector3} v
   * @returns {number}
   */
  getDistanceTo(v) {
    return this.model.position.distanceTo(v)
  }

  /**
   * Get angle of current model to target
   *
   * @param {Vector3} v
   * @returns {number}
   */
  getAngleTo(v) {
    const direction = this.getDirection()
    return direction.angleTo(v)
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
  getShipEnergy() {
    return this.spaceship.getShipEnergy()
  }

  /**
   *
   * @returns {Energy|?}
   */
  getGunEnergy() {
    return this.spaceship.getGunEnergy()
  }

  /**
   *
   * @returns {Energy|?}
   */
  getGroupEnergy() {
    return this.spaceship.getGroupEnergy()
  }

  /**
   * @returns {void}
   */
  async beforeStart() {
    await this.spaceship.beforeStart()
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
    this.model.boxBody.position.copy(this.position)
    this.model.setReference(this.spaceship)
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
   * @param {Number} delta
   * @param {Function} [onChangeCallback]
   * @returns {void}
   */
  restoreEnergy(delta, onChangeCallback) {
    this.spaceship.restoreEnergy(delta, onChangeCallback)
  }

  /**
   *
   * @param {Number} delta
   * @param {Function} [onChangeCallback]
   * @returns {void}
   */
  restoreShell(delta, onChangeCallback) {
    this.spaceship.restoreShell(delta, onChangeCallback)
  }

  /**
   *
   * @param {Number} delta
   * @param {Function} [onChangeCallback]
   * @returns {void}
   */
  rechargeGuns(delta, onChangeCallback) {
    this.spaceship.rechargeGuns(delta, onChangeCallback)
  }

  /**
   *
   * @param {number} delta
   * @returns {ModelSpaceship}
   */
  update(delta) {
    this.moveControls.update(delta)
    this.position.copy(this.model.position)

    return this
  }
}

export default ModelSpaceship
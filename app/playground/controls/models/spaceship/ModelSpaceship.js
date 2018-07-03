import Spaceship from '@entity/particles-spaceship/Spaceship'
import MoveControls from './../../MoveControls'
import Aim from './../../../decoration/Aim'
import Model from './../Model'

class ModelSpaceship {
  /**
   *
   * @param {Playground} playground
   */
  constructor(playground) {
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

    // /**
    //  *
    //  * @type {Aim}
    //  */
    // this.aim = new Aim()
    // this.aim.position.z = 800
    // this.aim.scale.set(0.15, 0.15, 0.15)
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

  // /**
  //  *
  //  * @returns {ModelSpaceship}
  //  */
  // buildAim() {
  //   this.aim.build()
  //   this.model.addToGroup(this.aim)
  //   return this
  // }

  /**
   *
   * @returns {ModelSpaceship}
   */
  buildModel() {
    const shell = this.spaceship.getShell()
    const model = this.loader.getModel(shell.modelKey)
    this.model.add(model)
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
    this.moveControls.update(delta)
  }
}

export default ModelSpaceship
import Aim from './../../../decoration/Aim'
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
     * @type {Aim}
     */
    this.aim = new Aim()
    this.aim.position.z = 800
    this.aim.scale.set(0.15, 0.15, 0.15)
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
  buildAim() {
    this.aim.build()
    this.add(this.aim)
    return this
  }

  /**
   *
   * @returns {ModelSpaceship}
   */
  buildModel() {
    const model = this.loader.getModel(this.spaceship.modelKey)
    this.add(model)
    return this
  }

  /**
   *
   * @returns {ModelSpaceship}
   */
  removeModel() {
    // for (const element of this.mesh.children) {
    //   this.mesh.remove(element)
    // }
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
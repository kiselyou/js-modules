import Asteroid from '@entity/particles-sector/Asteroid'
import Model from './../Model'

class ModelAsteroid extends Asteroid {
  /**
   *
   * @param {Scene} scene
   * @param {Loader} loader
   */
  constructor(scene, loader) {
    super()

    /**
     *
     * @type {Scene}
     */
    this.scene = scene

    /**
     * @type {Loader}
     */
    this.loader = loader

    /**
     *
     * @type {Model}
     */
    this.model = new Model()
  }

  /**
   *
   * @returns {void}
   */
  buildModel() {
    const model = this.loader.getModel(this.modelKey)
    if (model) {
      this.model.build(model, this.id)
      this.model.setReference(this)
      this.model.scale.copy(this.scale)
      this.model.position.copy(this.position)
      this.model.rotation.copy(this.rotation)
      this.scene.add(this.model)
    } else {
      throw new Error('Couldn\'t find Asteroid model')
    }
  }

  /**
   *
   * @param {Loader} loader
   * @returns {void}
   */
  async beforeStart(loader) {
    this.setCategoryName('Asteroid')
    this.buildModel()
  }

  /**
   *
   * @param {Object} data
   * @param {Array} [except]
   * @returns {ModelAsteroid}
   */
  copy(data, except = []) {
    super.copy(data, except)
    return this
  }

  /**
   *
   * @param {number} delta
   * @returns {ModelAsteroid}
   */
  calculatePosition(delta = 1) {
    this.angleToCenter += this.speedMove * delta
    this.model.position.setX(this.distanceToCenter * Math.cos(this.angleToCenter))
    this.model.position.setZ(this.distanceToCenter * Math.sin(this.angleToCenter))
    return this
  }

  /**
   *
   * @param {number} delta
   * @returns {void}
   */
  update(delta) {
    // this.calculatePosition(delta)
  }
}

export default ModelAsteroid
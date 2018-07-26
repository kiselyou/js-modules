import Asteroid from '@entity/particles-sector/Asteroid'
import Model from './../Model'

class ModelAsteroid extends Asteroid {
  /**
   *
   * @param {Loader} loader
   */
  constructor(loader) {
    super()

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
      model.scale.copy(this.scale)
      model.rotation.copy(this.rotation)
      this.model.build(model, this.id)
      this.model.setReference(this)
      this.model.boxBody.position.copy(this.position)
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
   * @returns {void}
   */
  update(delta) {
    this.model.updateModel()
  }
}

export default ModelAsteroid
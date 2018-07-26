import Station from '@entity/particles-sector/Station'
import Model from './../Model'

class ModelStation extends Station {
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
      this.model.build(model, this.id)
      this.model.setReference(this)
      this.calculatePosition(0)
      this.model.boxBody.position.copy(this.model.position)
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
    this.setCategoryName('Station')
    this.buildModel()
  }

  /**
   *
   * @param {Object} data
   * @param {Array} [except]
   * @returns {ModelStation}
   */
  copy(data, except = []) {
    super.copy(data, except)
    return this
  }

  /**
   *
   * @param {number} delta
   * @returns {ModelStation}
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
   * @returns {ModelStation}
   */
  update(delta) {
    this.model.updateModel()
    return this
  }
}

export default ModelStation
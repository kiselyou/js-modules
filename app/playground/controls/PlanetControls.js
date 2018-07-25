import ModelPlanet from './models/planet/ModelPlanet'

class PlanetControls {
  /**
   *
   * @param {Loader} loader
   */
  constructor(loader) {
    /**
     * @type {string}
     */
    this.entity = this.constructor.name

    /**
     * @type {Loader}
     */
    this.loader = loader

    /**
     *
     * @type {Array.<ModelPlanet>}
     */
    this.elements = []

    /**
     *
     * @type {boolean}
     */
    this.enabled = true
  }

  /**
   *
   * @returns {PlanetControls}
   */
  prepareParentPlanets() {
    const prepare = {}
    for (const model of this.elements) {
      prepare[model.id] = model
    }

    for (const model of this.elements) {
      if (prepare.hasOwnProperty(model.parentId)) {
        model.parentModel = prepare[model.parentId]
      }
    }
    return this
  }

  /**
   *
   * @returns {PlanetControls}
   */
  async beforeStart() {
    this.prepareParentPlanets()
    for (const element of this.elements) {
      await element.beforeStart(this.loader)
    }
    return this
  }

  /**
   *
   * @param {number} delta
   * @returns {PlanetControls}
   */
  update(delta) {
    if (!this.enabled) {
      return this
    }
    for (let element of this.elements) {
      element.update(delta)
    }
    return this
  }

  /**
   *
   * @param {SwapInfo} data
   */
  setSwapInfo(data) {

  }

  /**
   *
   * @param {Array.<Planet>} data
   * @returns {PlanetControls}
   */
  copy(data) {
    for (const particle of data) {
      this.elements.push(new ModelPlanet(this.loader).copy(particle))
    }
    return this
  }
}

export default PlanetControls
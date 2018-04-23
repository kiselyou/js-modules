import ModelPlanet from './models/ModelPlanet'

class PlanetControls {
  /**
   *
   * @param {Scene} scene
   * @param {Loader} loader
   */
  constructor(scene, loader) {

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
     * @type {Array.<ModelPlanet>}
     */
    this.planets = []
  }

  /**
   * @returns {void}
   */
  async beforeStart() {

  }

  /**
   *
   * @param {object} data
   * @returns {PlanetControls}
   */
  copy(data) {
    for (const planet of data.planet) {
      this.planets.push(new ModelPlanet(this.scene, this.loader).copy(planet))
    }
    return this
  }

  /**
   *
   * @param {number} delta
   * @returns {void}
   */
  update(delta) {
    for (let model of this.planets) {
      model.update(delta)
    }
  }
}

export default PlanetControls
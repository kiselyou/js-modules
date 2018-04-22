import ModelPlanet from './models/ModelPlanet'

class PlanetControls {
  /**
   *
   * @param {Scene} scene
   */
  constructor(scene) {

    /**
     *
     * @type {Scene}
     */
    this.scene = scene

    /**
     *
     * @type {Array.<ModelPlanet>}
     */
    this.planets = []
  }

  /**
   *
   * @param {object} data
   * @returns {PlanetControls}
   */
  copy(data) {
    for (const planet of data.planet) {
      this.planets.push(new ModelPlanet(this.scene).copy(planet))
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
import ModelPlanet from './models/planet/ModelPlanet'

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
   *
   * @param {Loader} loader
   * @returns {void}
   */
  async beforeStart(loader) {
    this.preparePlanets(this.planets)
    for (const modelPlanet of this.planets) {
      modelPlanet.beforeStart(loader)
    }
  }

  /**
   *
   * @param {Array.<ModelPlanet>} modelPlanets
   */
  preparePlanets(modelPlanets) {
    const prepare = {}
    for (const modelPlanet of modelPlanets) {
      prepare[modelPlanet.id] = modelPlanet
    }

    for (const modelPlanet of modelPlanets) {
      const parentId = modelPlanet.parentId
      if (prepare.hasOwnProperty(parentId)) {
        modelPlanet.setParentPlanet(prepare[parentId])
      }
      modelPlanet.calculatePosition(0)
    }
  }

  /**
   *
   * @param {object} data
   * @returns {PlanetControls}
   */
  copy(data) {
    for (const planet of data.planet) {
      this.planets.push(
        new ModelPlanet(this.scene, this.loader)
          .copy(planet)
      )
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

  /**
   * сенхронизация планет с server -> client
   *
   * @param {SwapInfo} data
   */
  setSwapInfo(data) {
    const swapPlanets = data.sector.planets
    for (const swapPlanet of swapPlanets) {
      const planet = this.findPlanetById(swapPlanet.id)
      if (planet) {
        planet.copy(swapPlanet)
      }
    }
  }

  /**
   *
   * @param {string} id
   * @returns {ModelPlanet|?}
   */
  findPlanetById(id) {
    const planet = this.planets.find((planet) => planet.id === id)
    return planet ? planet : null
  }
}

export default PlanetControls
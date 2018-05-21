import ModelPlanet from './models/planet/ModelPlanet'
import BaseModelControls from './BaseModelControls'

class PlanetControls extends BaseModelControls {
  /**
   *
   * @param {Scene} scene
   * @param {Loader} loader
   */
  constructor(scene, loader) {
    super(scene, loader)
  }

  /**
   *
   * @param {Loader} loader
   * @returns {void}
   */
  async beforeStart(loader) {
    this.preparePlanets(this.elements)
    super.beforeStart(loader)
  }

  /**
   *
   * @param {Array.<ModelPlanet>} modelPlanets
   * @returns {void}
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
   * @param {Array} dataModels
   * @returns {PlanetControls}
   */
  copy(dataModels) {
    super.copy(dataModels, ModelPlanet)
    return this
  }
}

export default PlanetControls
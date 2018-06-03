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
   * @returns {void}
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
  }

  /**
   *
   * @param {Loader} loader
   * @returns {void}
   */
  async beforeStart(loader) {
    this.prepareParentPlanets()
    super.beforeStart(loader)
  }
}

export default PlanetControls
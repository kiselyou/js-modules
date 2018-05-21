import ModelAsteroid from '@app/playground/controls/models/asteroid/ModelAsteroid'
import BaseModelControls from './BaseModelControls'

class AsteroidControls extends BaseModelControls {
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
   * @param {Array} dataModels
   * @returns {AsteroidControls}
   */
  copy(dataModels) {
    super.copy(dataModels, ModelAsteroid)
    return this
  }
}

export default AsteroidControls
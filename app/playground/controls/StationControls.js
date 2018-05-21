import ModelStation from '@app/playground/controls/models/station/ModelStation'
import BaseModelControls from './BaseModelControls'

class StationControls extends BaseModelControls {
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
   * @returns {StationControls}
   */
  copy(dataModels) {
    super.copy(dataModels, ModelStation)
    return this
  }
}

export default StationControls
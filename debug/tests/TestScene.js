import DefaultScene from '@app-debug/DefaultScene'
import ModelControls from '@app-debug/tests/ModelControls'

class TestScene extends DefaultScene {
  constructor() {
    super()

    /**
     *
     * @type {ModelControls}
     */
    this.modelControls = new ModelControls(this)
  }

  /**
   *
   * @returns {TestScene|DefaultScene}
   */
  update() {
    super.update()
    this.modelControls.update(this.delta)
    return this
  }
}

export default TestScene
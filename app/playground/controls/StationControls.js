import ModelStation from '@app/playground/controls/models/station/ModelStation'

class StationControls {
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
     * @type {Array.<ModelStation>}
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
   * @returns {StationControls}
   */
  async beforeStart() {
    for (const element of this.elements) {
      await element.beforeStart(this.loader)
    }
    return this
  }

  /**
   *
   * @param {number} delta
   * @returns {StationControls}
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
   * @param {Array.<Station>} data
   * @returns {StationControls}
   */
  copy(data) {
    for (const particle of data) {
      this.elements.push(new ModelStation(this.loader).copy(particle))
    }
    return this
  }
}

export default StationControls
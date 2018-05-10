import ModelStation from '@app/playground/controls/models/station/ModelStation'

class StationControls {
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
     * @type {Array.<ModelStation>}
     */
    this.stations = []
  }

  /**
   *
   * @param {Loader} loader
   * @returns {void}
   */
  async beforeStart(loader) {
    for (const modelStation of this.stations) {
      modelStation.beforeStart(loader)
    }
  }

  /**
   *
   * @param {object} data
   * @returns {StationControls}
   */
  copy(data) {
    for (const station of data.station) {
      this.stations.push(
        new ModelStation(this.scene, this.loader)
          .copy(station)
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
    for (let model of this.stations) {
      model.update(delta)
    }
  }

  /**
   * сенхронизация планет с server -> client
   *
   * @param {SwapInfo} data
   */
  setSwapInfo(data) {

  }
}

export default StationControls
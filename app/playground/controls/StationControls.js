import ModelStation from '@app/playground/controls/models/station/ModelStation'
import DebugPanel from '@app/debug/DebugPanel'
import EventControls from './EventControls'

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

    /**
     *
     * @type {boolean}
     */
    this.enabled = true

    /**
     *
     * @type {DebugPanel}
     */
    this.debugPanel = new DebugPanel()
      .addFolder('Stations controls')
      .add(this.stations, 'length', 'Count stations')
      .add(this, 'enabled', 'Controls enabled')

    /**
     *
     * @type {EventControls}
     */
    this.eventControls = new EventControls()
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
    if (!this.enabled) {
      return
    }
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

  /**
   *
   * @param {Intersect} intersect
   * @param {MouseEvent} mouseEvent
   * @returns {void}
   */
  updateTooltip(intersect, mouseEvent) {
    for (const modelStation of this.stations) {
      modelStation.updateTooltip(intersect, mouseEvent)
    }
  }

  /**
   *
   * @param {Intersect} intersect
   * @param {MouseEvent} mouseEvent
   * @returns {void}
   */
  onClick(intersect, mouseEvent) {
    for (const modelStation of this.stations) {

      // DEBUG PANEL
      const isIntersect = intersect.is(modelStation.model)
      if (isIntersect) {
        const folderName = `Model station control ${modelStation.name}`
        this.eventControls.ifNotActive(folderName, () => {
          this.debugPanel
            .addFolder(folderName)
            .add(modelStation.model.scale, 'x', 'Scale X', 0.01, 100)
            .add(modelStation.model.scale, 'y', 'Scale Y', 0.01, 100)
            .add(modelStation.model.scale, 'z', 'Scale Z', 0.01, 100)
            .add(modelStation.model.position, 'x', 'Position X', -6000, 6000)
            .add(modelStation.model.position, 'y', 'Position Y', -6000, 6000)
            .add(modelStation.model.position, 'z', 'Position Z', -6000, 6000)
            .add(modelStation.model.rotation, 'x', 'rotation X', 0, 4 * Math.PI)
            .add(modelStation.model.rotation, 'y', 'rotation Y', 0, 4 * Math.PI)
            .add(modelStation.model.rotation, 'z', 'rotation Z', 0, 4 * Math.PI)
        })
      }

      modelStation.onClick(intersect, mouseEvent)
    }
  }
}

export default StationControls
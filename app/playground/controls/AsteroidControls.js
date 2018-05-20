import ModelAsteroid from '@app/playground/controls/models/asteroid/ModelAsteroid'
import DebugPanel from '@app/debug/DebugPanel'
import EventControls from './EventControls'

class AsteroidControls {
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
     * @type {Array.<ModelAsteroid>}
     */
    this.asteroids = []

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
      .addFolder('Asteroids controls')
      .add(this.asteroids, 'length', 'Count asteroids')
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
    for (const modelAsteroid of this.asteroids) {
      modelAsteroid.beforeStart(loader)
    }
  }

  /**
   *
   * @param {object} data
   * @returns {AsteroidControls}
   */
  copy(data) {
    for (const asteroid of data.asteroid) {
      this.asteroids.push(
        new ModelAsteroid(this.scene, this.loader)
          .copy(asteroid)
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
    for (let model of this.asteroids) {
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
    for (const modelAsteroid of this.asteroids) {
      modelAsteroid.updateTooltip(intersect, mouseEvent)
    }
  }

  /**
   *
   * @param {Intersect} intersect
   * @param {MouseEvent} mouseEvent
   * @returns {void}
   */
  onClick(intersect, mouseEvent) {
    for (const modelAsteroid of this.asteroids) {

      // DEBUG PANEL
      const isIntersect = intersect.is(modelAsteroid.model)
      if (isIntersect) {
        const folderName = `Model asteroid control ${modelAsteroid.name}`
        this.eventControls.ifNotActive(folderName, () => {
          this.debugPanel
            .addFolder(folderName)
            .add(modelAsteroid.model.scale, 'x', 'Scale X', 0.01, 100)
            .add(modelAsteroid.model.scale, 'y', 'Scale Y', 0.01, 100)
            .add(modelAsteroid.model.scale, 'z', 'Scale Z', 0.01, 100)
            .add(modelAsteroid.model.position, 'x', 'Position X', -6000, 6000)
            .add(modelAsteroid.model.position, 'y', 'Position Y', -6000, 6000)
            .add(modelAsteroid.model.position, 'z', 'Position Z', -6000, 6000)
            .add(modelAsteroid.model.rotation, 'x', 'rotation X', 0, 4 * Math.PI)
            .add(modelAsteroid.model.rotation, 'y', 'rotation Y', 0, 4 * Math.PI)
            .add(modelAsteroid.model.rotation, 'z', 'rotation Z', 0, 4 * Math.PI)
        })
      }

      modelAsteroid.onClick(intersect, mouseEvent)
    }
  }
}

export default AsteroidControls
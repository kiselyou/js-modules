import ModelAsteroid from '@app/playground/controls/models/asteroid/ModelAsteroid'

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
    for (const model of this.asteroids) {
      model.updateTooltip(intersect, mouseEvent)
    }
  }
}

export default AsteroidControls
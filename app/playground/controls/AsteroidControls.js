import ModelAsteroid from '@app/playground/controls/models/asteroid/ModelAsteroid'

class AsteroidControls {
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
     * @type {Array.<ModelAsteroid>}
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
   * @returns {AsteroidControls}
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
   * @returns {AsteroidControls}
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
   * @param {(Array.<Asteroid>)} data
   * @returns {AsteroidControls}
   */
  copy(data) {
    for (const particle of data) {
      this.elements.push(new ModelAsteroid(this.loader).copy(particle))
    }
    return this
  }
}

export default AsteroidControls
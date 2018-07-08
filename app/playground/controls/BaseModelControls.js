import ModelAsteroid from './models/asteroid/ModelAsteroid'
import ModelStation from './models/station/ModelStation'
import ModelPlanet from './models/planet/ModelPlanet'

import Asteroid from '@entity/particles-sector/Asteroid'
import Station from '@entity/particles-sector/Station'
import Planet from '@entity/particles-sector/Planet'

class BaseModelControls {
  /**
   *
   * @param {Scene} scene
   * @param {Loader} loader
   */
  constructor(scene, loader) {
    /**
     * @type {string}
     */
    this.entity = this.constructor.name

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
     * @type {Array.<ModelStation|ModelAsteroid|ModelPlanet>}
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
   * @param {Loader} loader
   * @returns {void}
   */
  async beforeStart(loader) {
    for (const element of this.elements) {
      element.beforeStart(loader)
    }
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
    for (let element of this.elements) {
      element.update(delta)
    }
  }

  /**
   * сенхронизация элемента с server -> client
   *
   * @param {SwapInfo} data
   */
  setSwapInfo(data) {

  }

  /**
   *
   * @param {(Array.<Asteroid>|Array.<Planet>|Array.<Station>)} data
   * @returns {BaseModelControls}
   */
  copy(data) {
    for (const particle of data) {
      switch (particle.entity) {
        case 'Asteroid':
          this.elements.push(new ModelAsteroid(this.scene, this.loader).copy(particle))
          break
        case 'Station':
          this.elements.push(new ModelStation(this.scene, this.loader).copy(particle))
          break
        case 'Planet':
          this.elements.push(new ModelPlanet(this.scene, this.loader).copy(particle))
          break
      }
    }
    return this
  }
}

export default BaseModelControls
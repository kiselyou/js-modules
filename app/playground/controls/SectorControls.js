import PlanetControls from './PlanetControls'
import Sector from '@entity/sector/Sector'
import SkyBoxControls from './SkyBoxControls'
import StarControls from './StarControls'
import StarLightControls from './StarLightControls'
import { Vector3 } from 'three'

class SectorControls extends Sector {
  /**
   *
   * @param {Scene} scene
   * @param {Loader} loader
   */
  constructor(scene, loader) {
    super()

    /**
     * @type {Scene}
     */
    this.scene = scene

    /**
     * @type {Loader}
     */
    this.loader = loader

    /**
     *
     * @type {SkyBoxControls}
     */
    this.skyBoxControls = new SkyBoxControls(this.scene, this.loader)

    /**
     *
     * @type {PlanetControls}
     */
    this.planetsControls = new PlanetControls(this.scene, this.loader)

    /**
     *
     * @type {StarControls}
     */
    this.starControls = new StarControls(this.skyBoxControls.sky)

    /**
     *
     * @type {StarLightControls}
     */
    this.starLightControls = new StarLightControls(this.skyBoxControls.sky)
  }

  /**
   * @returns {void}
   */
  async beforeStart() {
    await this.starControls.beforeStart(this.loader)
    await this.skyBoxControls.beforeStart(this.loader)
    await this.planetsControls.beforeStart(this.loader)
    await this.starLightControls.beforeStart(this.loader)
  }

  /**
   *
   * @param {object} data
   * @returns {SectorControls}
   */
  copy(data) {
    super.copy(data['sector'])
    this.planetsControls.copy(data)
    this.starControls.copy(data['star'])
    this.starLightControls.copy(data['starLight'])
    return this
  }

  /**
   *
   * @param {number} delta
   * @param {Vector3} playerPosition
   * @returns {void}
   */
  update(delta, playerPosition) {
    this.planetsControls.update(delta)
    this.skyBoxControls.update(delta, playerPosition)
    this.starControls.update(delta)
    this.starLightControls.update(delta)
  }

  /**
   *
   * @param {SwapInfo} data
   */
  setSwapInfo(data) {
    this.planetsControls.setSwapInfo(data)

  }
}

export default SectorControls
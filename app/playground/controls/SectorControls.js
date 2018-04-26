import PlanetControls from './PlanetControls'
import Sector from '@entity/sector/Sector'
import SkyBoxControls from './SkyBoxControls'
import StarControls from './StarControls'
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
     * TODO: temp
     * @type {Vector3}
     */
    this.playerPosition = new Vector3()
  }

  /**
   * @returns {void}
   */
  async beforeStart() {
    await this.starControls.beforeStart()
    await this.skyBoxControls.beforeStart()
    await this.planetsControls.beforeStart()
  }

  /**
   *
   * @param {object} data
   * @returns {SectorControls}
   */
  copy(data) {
    this.planetsControls.copy(data)
    this.starControls.copy(data.star)
    super.copy(data.sector)
    return this
  }

  /**
   *
   * @param {number} delta
   * @returns {void}
   */
  update(delta) {
    this.planetsControls.update(delta)
    this.skyBoxControls.update(delta, this.playerPosition)
    this.starControls.update(delta)
  }
}

export default SectorControls
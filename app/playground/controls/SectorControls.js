import PlanetControls from './PlanetControls'
import StationControls from './StationControls'
import AsteroidControls from './AsteroidControls'
import Sector from '@entity/sector/Sector'
import SkyBoxControls from './SkyBoxControls'
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
     * @type {StationControls}
     */
    this.stationControls = new StationControls(this.scene, this.loader)

    /**
     *
     * @type {AsteroidControls}
     */
    this.asteroidControls = new AsteroidControls(this.scene, this.loader)

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
    await this.skyBoxControls.beforeStart(this.loader)
    await this.planetsControls.beforeStart(this.loader)
    await this.stationControls.beforeStart(this.loader)
    await this.asteroidControls.beforeStart(this.loader)
  }

  /**
   *
   * @param {object} data
   * @returns {SectorControls}
   */
  copy(data) {
    super.copy(data['sector'])
    this.planetsControls.copy(data.planet)
    this.stationControls.copy(data.station)
    this.asteroidControls.copy(data.asteroid)
    this.skyBoxControls.copy(data)
    // this.starLightControls.copy(data['starLight'])
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
    this.stationControls.update(delta)
    this.asteroidControls.update(delta)
    this.skyBoxControls.update(delta, playerPosition)
    // this.starLightControls.update(delta)
  }

  /**
   *
   * @param {SwapInfo} data
   */
  setSwapInfo(data) {
    this.planetsControls.setSwapInfo(data)
    this.stationControls.setSwapInfo(data)
    this.asteroidControls.setSwapInfo(data)
  }

  /**
   *
   * @param {Intersect} intersect
   * @param {MouseEvent} mouseEvent
   * @returns {void}
   */
  updateTooltip(intersect, mouseEvent) {
    this.planetsControls.updateTooltip(intersect, mouseEvent)
    this.stationControls.updateTooltip(intersect, mouseEvent)
    this.asteroidControls.updateTooltip(intersect, mouseEvent)
  }

  /**
   *
   * @param {Intersect} intersect
   * @param {MouseEvent} mouseEvent
   * @returns {void}
   */
  onClick(intersect, mouseEvent) {
    this.planetsControls.onClick(intersect, mouseEvent)
    this.stationControls.onClick(intersect, mouseEvent)
    this.asteroidControls.onClick(intersect, mouseEvent)
  }

  /**
   *
   * @returns {LightControls}
   */
  get lightControls() {
    return this.skyBoxControls.lightControls
  }
}

export default SectorControls
import PlanetControls from './PlanetControls'
import StationControls from './StationControls'
import AsteroidControls from './AsteroidControls'
import Sector from '@entity/particles-sector/Sector'
import SkyBoxControls from './SkyBoxControls'
import StarLightControls from './StarLightControls'
import { Vector3 } from 'three'
import ParticlePlayGround from "@entity/ParticlePlayGround";

class SectorControls {
  /**
   *
   * @param {Scene} scene
   * @param {Loader} loader
   */
  constructor(scene, loader) {

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
     * @type {Sector}
     */
    this.sector = new Sector()

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
    await this.starLightControls.beforeStart(this.loader)
  }

  /**
   *
   * @param {ParticlePlayGround} data
   * @returns {SectorControls}
   */
  copy(data) {
    this.skyBoxControls.copy(data)
    this.sector.copy(data.getCurrentSector())
    this.planetsControls.copy(data.getPlanets())
    this.stationControls.copy(data.getStations())
    this.asteroidControls.copy(data.getAsteroids())
    this.starLightControls.copy(data.getStarLights())
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
    this.starLightControls.update(delta)
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
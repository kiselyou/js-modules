import PlanetControls from './PlanetControls'
import StationControls from './StationControls'
import AsteroidControls from './AsteroidControls'
import Sector from '@entity/particles-sector/Sector'
import SkyBoxControls from './SkyBoxControls'
import { Vector3 } from 'three'
import ParticlePlayGround from "@entity/ParticlePlayGround";

class SectorControls {
  /**
   *
   * @param {Playground} playground
   */
  constructor(playground) {

    /**
     * @type {Loader}
     */
    this.loader = playground.loader

    /**
     *
     * @type {Sector}
     */
    this.sector = new Sector()

    /**
     *
     * @type {SkyBoxControls}
     */
    this.skyBoxControls = new SkyBoxControls(this.loader)

    /**
     *
     * @type {PlanetControls}
     */
    this.planetsControls = new PlanetControls(this.loader)

    /**
     *
     * @type {StationControls}
     */
    this.stationControls = new StationControls(this.loader)

    /**
     *
     * @type {AsteroidControls}
     */
    this.asteroidControls = new AsteroidControls(this.loader)
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
   * @param {ParticlePlayGround} data
   * @returns {SectorControls}
   */
  copy(data) {
    this.skyBoxControls.copy(data)
    this.sector.copy(data.getCurrentSector())
    this.planetsControls.copy(data.getPlanets())
    this.stationControls.copy(data.getStations())
    this.asteroidControls.copy(data.getAsteroids())
    return this
  }

  /**
   *
   * @param {number} delta
   * @param {Vector3} playerPosition
   * @returns {SectorControls}
   */
  update(delta, playerPosition) {
    this.planetsControls.update(delta)
    this.stationControls.update(delta)
    this.asteroidControls.update(delta)
    this.skyBoxControls.update(delta, playerPosition)
    return this
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
   * @returns {LightControls}
   */
  get lightControls() {
    return this.skyBoxControls.lightControls
  }
}

export default SectorControls
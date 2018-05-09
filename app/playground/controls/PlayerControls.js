import SectorControls from './SectorControls'
import RaceControls from './RaceControls'
import Player from '@entity/sector/Player'

class PlayerControls {
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
     *
     * @type {Loader}
     */
    this.loader = loader

    /**
     *
     * @type {Player}
     */
    this.player = new Player()

    /**
     *
     * @type {RaceControls}
     */
    this.raceControls = new RaceControls()

    /**
     *
     * @type {SectorControls}
     */
    this.sectorControls = new SectorControls(this.scene, this.loader)
  }

  /**
   * @returns {void}
   */
  async beforeStart() {
    await this.raceControls.beforeStart()
    await this.sectorControls.beforeStart()
  }

  /**
   *
   * @param {Object} data
   * @returns {PlayerControls}
   */
  copy(data) {
    this.sectorControls.copy(data)
    this.player.copy(data.player)
    return this
  }

  /**
   *
   * @param {number} delta
   * @returns {void}
   */
  update(delta) {
    this.sectorControls.update(delta, this.player.position)
  }
}

export default PlayerControls
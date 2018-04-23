import SectorControls from './SectorControls'
import RaceControls from './RaceControls'
import Player from '@entity/sector/Player'

class PlayerControls extends Player {
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
     *
     * @type {Loader}
     */
    this.loader = loader

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
    super.copy(data.player)
    return this
  }

  /**
   *
   * @param {number} delta
   * @returns {void}
   */
  update(delta) {
    this.sectorControls.update(delta)
  }
}

export default PlayerControls
import SectorControls from './SectorControls'
import RaceControls from './RaceControls'
import Player from '@entity/sector/Player'

class PlayerControls extends Player {
  /**
   *
   * @param {Scene} scene
   */
  constructor(scene) {
    super()
    /**
     * @type {Scene}
     */
    this.scene = scene

    /**
     *
     * @type {RaceControls}
     */
    this.raceControls = new RaceControls()

    /**
     *
     * @type {SectorControls}
     */
    this.sectorControls = new SectorControls(scene)
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
import SectorControls from './SectorControls'

class PlayerControls {

  /**
   *
   * @param {Scene} scene
   */
  constructor(scene) {
    /**
     * @type {Scene}
     */
    this.scene = scene

    /**
     *
     * @type {SectorControls}
     */
    this.sector = new SectorControls(scene)
  }

  /**
   *
   * @param {number} delta
   * @returns {void}
   */
  update(delta) {
    this.sector.update(delta)
  }
}

export default PlayerControls
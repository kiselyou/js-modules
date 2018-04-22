import PlanetControls from './PlanetControls'
import Sector from '@entity/sector/Sector'

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
     * @type {PlanetControls}
     */
    this.planetsControls = new PlanetControls(this.scene, this.loader)
  }

  /**
   *
   * @param {object} data
   * @returns {SectorControls}
   */
  copy(data) {
    this.planetsControls.copy(data)
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
  }
}

export default SectorControls
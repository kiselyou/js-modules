import PlanetControls from './PlanetControls'
import Sector from '@entity/sector/Sector'

class SectorControls extends Sector {
  constructor(scene) {
    super()

    /**
     * @type {Scene}
     */
    this.scene = scene

    /**
     *
     * @type {PlanetControls}
     */
    this.planetsControls = new PlanetControls(this.scene)
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
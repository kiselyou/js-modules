import PlanetControls from './PlanetControls'

class SectorControls {
  constructor(scene) {

    /**
     * @type {Scene}
     */
    this.scene = scene

    /**
     *
     * @type {PlanetControls}
     */
    this.planets = new PlanetControls(this.scene)
    for (let i = 0; i < 20; i++) {
      this.planets.add()
    }
  }

  /**
   *
   * @param {number} delta
   * @returns {void}
   */
  update(delta) {
    this.planets.update(delta)
  }
}

export default SectorControls
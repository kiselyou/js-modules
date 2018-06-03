import Particle from './../Particle'

class Sector extends Particle {
  constructor() {
    super()
  }

  /**
   *
   * @returns {Object}
   */
  getSwapInfo() {
    const data = {}
    const properties = ['id']
    for (const property of properties) {
      switch (property) {
        default:
          data[property] = this[property]
      }

    }
    return data
  }

  /**
   *
   * @returns {Array.<Object>}
   */
  getSwapInfoPlanets() {
    const data = []
    for (const planet of this.planets) {
      data.push(planet.getSwapInfo())
    }
    return data
  }
}

export default Sector
import Particle from './../Particle'
class Gun extends Particle {
  constructor() {
    super()
  }

  /**
   *
   * @param {Object} data
   * @returns {Gun}
   */
  copy(data) {
    super.copy(data)
    return this
  }
}

export default Gun
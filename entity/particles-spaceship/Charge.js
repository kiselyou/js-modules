import Particle from './../Particle'

class Charge extends Particle {
  constructor() {
    super()

    /**
     *
     * @type {number}
     */
    this.speed = 300

    /**
     *
     * @type {number}
     */
    this.maxDistance = 3000
  }

  /**
   * @returns {Object}
   */
  getChargeSwapInfo() {
    const data = {}
    const properties = [
      'speed',
      'maxDistance',
    ]
    for (const property of properties) {
      switch (property) {
        default:
          data[property] = this[property]
          break
      }
    }
    return data
  }

  /**
   *
   * @param {Object} data - this is value from "this.getChargeSwapInfo()"
   * @returns {Charge}
   */
  setChargeSwapInfo(data) {
    for (const property in data) {
      if (data.hasOwnProperty(property)) {
        switch (property) {
          default:
            this[property] = data[property]
            break
        }
      }
    }
    return this
  }
}

export default Charge
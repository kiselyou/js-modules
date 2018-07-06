import Particle from './../Particle'
import Damage from './Damage'

class Charge extends Particle {
  constructor() {
    super()

    /**
     *
     * @type {number}
     */
    this.speed = 800

    /**
     *
     * @type {number}
     */
    this.damageMin = 24

    /**
     *
     * @type {number}
     */
    this.damageMax = 40

    /**
     *
     * @type {number}
     */
    this.maxDistance = 2000

    /**
     *
     * @type {number}
     */
    this.type = Damage.TYPE_SLIP
  }

  /**
   * @returns {Object}
   */
  getChargeSwapInfo() {
    const data = {}
    const properties = [
      'speed',
      'maxDistance',
      'damageMin',
      'damageMax',
      'type'
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
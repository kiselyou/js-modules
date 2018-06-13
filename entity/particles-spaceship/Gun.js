import Particle from './../Particle'
import Charge from './Charge'

class Gun extends Particle {
  constructor() {
    super()

    /**
     *
     * @type {string|?}
     */
    this.raceId = null

    /**
     *
     * @type {Charge}
     */
    this.charge = new Charge()
  }

  /**
   *
   * @param {string} value
   * @returns {Gun}
   */
  setRaceId(value) {
    this.raceId = value
    return this
  }

  /**
   *
   * @param {string} data
   * @returns {Gun}
   */
  copyCharge(data) {
    this.charge.copy(data)
    return this
  }

  /**
   *
   * @param {Object|null} data - if is null then values will be reset to null
   * @param {Array} [except]
   * @returns {Particle}
   */
  copy(data, except = []) {
    for (const property in data) {
      if ( ! this.hasOwnProperty(property)) {
        continue
      }

      if (except.includes(property)) {
        continue
      }

      if (data.hasOwnProperty(property)) {
        switch (property) {
          case 'entity':
            break
          case 'charge':
            this.charge.copy(data[property])
            break
          default:
            this[property] = data[property]
            break
        }
      }
    }
    return this
  }
}

export default Gun
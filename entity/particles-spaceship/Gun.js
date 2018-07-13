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

    /**
     *
     * @type {number}
     */
    this.direction = Gun.DIRECTION_DEFLECTION

    /**
     * Количество потребляемой енергии за выстрел
     *
     * @type {number}
     */
    this.energy = 10

    /**
     * Время перезарядки
     *
     * @type {number}
     */
    this.rechargeTime = 1000

    /**
     *
     * @type {number}
     */
    this.maxDeflection = Math.PI / 4
  }

  /**
   *
   * @param {number} value
   * @return {Gun}
   */
  setEnergy(value) {
    this.energy = value
    return this
  }

  /**
   *
   * @param {number} value
   * @return {Gun}
   */
  setTime(value) {
    this.time = value
    return this
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

  /**
   * Стрельба прямо
   *
   * @return {number}
   */
  static get DIRECTION_DIRECT() {
    return 1
  }

  /**
   * Стрельба в сторону цели
   *
   * @return {number}
   */
  static get DIRECTION_TARGET() {
    return 2
  }

  /**
   * Стрельба в сторону цели с упреждением
   *
   * @return {number}
   */
  static get DIRECTION_DEFLECTION() {
    return 3
  }
}

export default Gun
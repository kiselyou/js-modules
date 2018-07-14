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
     * Время перезарядки оружия
     *
     * @type {number}
     */
    this.rechargeTime = 1000

    /**
     * Текущее состояние перезарядки оружия
     *
     * @type {number}
     * @private
     */
    this.rechargeTimeState = 1000

    /**
     *
     * @type {number}
     */
    this.maxDeflection = Math.PI / 4
  }

  /**
   * Текущее состояние перезарядки в процентах
   *
   * @returns {number}
   */
  get rechargeStatePercent() {
    return this.rechargeTimeState * 100 / this.rechargeTime
  }

  /**
   *
   * @param {Number} delta
   * @param {Function} restoreCallback
   * @returns {Gun}
   */
  restoreTimerState(delta, restoreCallback) {
    if (this.rechargeTimeState < this.rechargeTime) {
      this.increaseTimer(delta * 1000, restoreCallback)
    }
    return this
  }

  /**
   *
   * @param {number} value
   * @param {Function} [onIncreaseCallback]
   * @return {Gun}
   */
  increaseTimer(value, onIncreaseCallback) {
    const rememberState = this.rechargeTimeState
    const frontValue = this.rechargeTimeState + value
    this.rechargeTimeState = frontValue > this.rechargeTime ? this.rechargeTime : frontValue
    if (onIncreaseCallback && rememberState < this.rechargeTimeState) {
      onIncreaseCallback(this)
    }
    return this
  }

  /**
   *
   * @returns {Gun}
   */
  discharge() {
    this.rechargeTimeState = 0
    return this
  }

  /**
   *
   * @returns {boolean}
   */
  isRecharged() {
    return this.rechargeTimeState === this.rechargeTime
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
  setRechargeTime(value) {
    this.rechargeTime = value
    this.rechargeTimeState = value
    return this
  }

  /**
   *
   * @param {Number} degree
   * @returns {Gun}
   */
  setMaxDeflection(degree) {
    this.maxDeflection = degree
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
   * @param {number} value
   * @returns {Gun}
   */
  setChargeSpeed(value) {
    this.charge.speed = value
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {Gun}
   */
  setDamageMin(value) {
    this.charge.damageMin = value
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {Gun}
   */
  setDamageMax(value) {
    this.charge.damageMax = value
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {Gun}
   */
  setMaxDistance(value) {
    this.charge.maxDistance = value
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
import Particle from './../Particle'
import Damage from './Damage'

class Shell extends Particle {
  constructor() {
    super()

    /**
     *
     * @type {string|?}
     */
    this.modelKey = null

    /**
     * Текущее состояние корпуса - (0-100)%
     *
     * @type {number}
     */
    this.state = 100

    /**
     * Размер карабля, вместимость
     *
     * @type {number}
     */
    this.size = 2000

    /**
     *
     * @type {Array.<Damage>}
     */
    this.damage = [
      new Damage()
        .setType(Damage.TYPE_SLIP)
        .setPercent(50)
        .setMin(15)
    ]
  }

  /**
   *
   * @param {number} type - constants of current class
   * @returns {Damage | undefined | null}
   */
  getDamage(type) {
    return this.damage.find((damage) => damage.type === type) || null
  }

  /**
   *
   * @param {number} value
   * @returns {Shell}
   */
  setState(value) {
    this.state = value
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {Shell}
   */
  setSize(value) {
    this.size = value
    return this
  }

  /**
   *
   * @param {string} value
   * @returns {Shell}
   */
  setModelKey(value) {
    this.modelKey = value
    return this
  }

  /**
   *
   * @param {number} value
   * @return {Shell}
   */
  increase(value) {
    let state = value * 100 / this.size
    this.state += (this.state + state > 100) ? 100 : state
  }

  /**
   *
   * @param {number} value
   * @return {Shell}
   */
  reduce(value) {
    let state = value * 100 / this.size
    this.state -= (this.state - state < 0) ? 0 : state
    return this
  }

  /**
   *
   * @param {number} value
   * @return {boolean}
   */
  isShell(value) {
    let state = value * 100 / this.size
    return this.state - state > 0
  }

  /**
   *
   * @param {Object|null} data - if is null then values will be reset to null
   * @param {Array} [except]
   * @returns {Armor}
   */
  copy(data, except = []) {
    super.copy(data, except.concat(['damage']))
    if (data.hasOwnProperty('damage')) {
      this.damage = []
      for (const damage of data['damage']) {
        this.damage.push(new Damage().copy(damage))
      }
    }
    return this
  }
}

export default Shell
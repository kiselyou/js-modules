import Particle from './../Particle'
import Damage from './Damage'

class Armor extends Particle {
  constructor() {
    super()

    /**
     * Текущее состояние брони - (0-100)%
     *
     * @type {number}
     */
    this.state = 100

    /**
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
        .setPercent(10)
        .setMin(3)
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
   * @returns {Armor}
   */
  setState(value) {
    this.state = value
    return this
  }

  /**
   *
   * @param {number} value
   * @return {Armor}
   */
  increase(value) {
    let state = value * 100 / this.size
    this.state += (this.state + state > 100) ? 100 : state
  }

  /**
   *
   * @param {number} value
   * @return {Armor}
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
  isArmor(value) {
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

export default Armor
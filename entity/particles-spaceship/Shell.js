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

    /**
     * Размер восстановлния ед.
     *
     * @type {number}
     */
    this.restoreSize = 10

    /**
     * Скорость восстановлния милисек.
     *
     * @type {number}
     */
    this.restoreTime = 1000

    /**
     * Таймер для расчета запуска востановления
     *
     * @type {number}
     * @private
     */
    this._timer = 0
  }

  /**
   *
   * @param {number} delta
   * @param {Function} [onChangeCallback]
   * @returns {Shell}
   */
  restore(delta, onChangeCallback) {
    this.restoreTimer(delta, () => {
      this.increase(this.restoreSize, onChangeCallback)
    })
    return this
  }

  /**
   *
   * @param {Number} delta
   * @param {Function} restoreCallback
   * @returns {Shell}
   */
  restoreTimer(delta, restoreCallback) {
    this._timer += delta
    if (this._timer * 1000 >= this.restoreTime) {
      this._timer = 0
      restoreCallback()
    }
    return this
  }

  /**
   *
   * @param {number} value
   * @param {Function} [onIncreaseCallback]
   * @return {Shell}
   */
  increase(value, onIncreaseCallback) {
    const rememberState = this.state
    let state = value * 100 / this.size
    const frontValue = this.state + state
    this.state = frontValue > 100 ? 100 : this.state + state
    if (onIncreaseCallback && rememberState < this.state) {
      onIncreaseCallback()
    }
    return this
  }

  /**
   *
   * @param {number} value
   * @param {Function} [onReduceCallback]
   * @return {Shell}
   */
  reduce(value, onReduceCallback) {
    const rememberState = this.state
    let state = value * 100 / this.size
    this.state = (this.state - state < 0) ? 0 : this.state - state

    if (onReduceCallback && rememberState > this.state) {
      onReduceCallback()
    }
    return this
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
   * @returns {Shell}
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
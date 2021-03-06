import Particle from './../Particle'
import Damage from './Damage'

/**
 * Class Energy
 * Генератор енергии. Может быть n кол-во на карабле
 */
class Energy extends Particle {
  constructor() {
    super()

    /**
     * Текущее состояние енергии - (0-100)%
     * Зависит от действий игрока
     *
     * @type {number}
     */
    this.state = 100

    /**
     * Объем, вместимость ед. Это значение будет увеличиваться путем улучшения частицы
     *
     * @type {number}
     */
    this.size = 2000

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
     *
     * @type {Array.<Damage>}
     */
    this.damage = [
      new Damage()
        .setType(Damage.TYPE_SLIP)
        .setPercent(10)
        .setMin(3)
    ]

    /**
     * Таймер для расчета запуска востановления
     *
     * @type {number}
     * @private
     */
    this._timer = 0
  }

  /**
   * Текущее состояние в еденицах
   *
   * @returns {number}
   */
  get stateSize() {
    return this.state * this.size / 100
  }

  /**
   * Установить текущее состояние в еденицах
   *
   * @returns {void}
   */
  set stateSize(value) {
    this.state = value * 100 / this.size
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
   * @param {number} delta
   * @param {Function} [onChangeCallback]
   * @returns {Energy}
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
   * @returns {Energy}
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
   * @return {Energy}
   */
  increase(value, onIncreaseCallback) {
    const rememberState = this.state
    let state = value * 100 / this.size
    const frontValue = this.state + state
    this.state = frontValue > 100 ? 100 : this.state + state
    if (onIncreaseCallback && rememberState < 100) {
      onIncreaseCallback()
    }
    return this
  }

  /**
   *
   * @param {number} value
   * @param {Function} [onReduceCallback]
   * @return {Energy}
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
   * @param {number} value
   * @return {boolean}
   */
  isEnergy(value) {
    let state = value * 100 / this.size
    return this.state - state > 0
  }

  /**
   *
   * @param {number} value
   * @returns {Energy}
   */
  setState(value) {
    this.state = value
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {Energy}
   */
  setSize(value) {
    this.size = value
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {Energy}
   */
  setRestoreSize(value) {
    this.restoreSize = value
    return this
  }

  /**
   *
   * @param {Object|null} data - if is null then values will be reset to null
   * @param {Array} [except]
   * @returns {Particle}
   */
  copy(data, except = []) {
    super.copy(data, except.concat(['damage']))
    for (const property in data) {
      if ( ! this.hasOwnProperty(property)) {
        continue
      }

      switch (property) {
        case 'damage':
          for (const damage of data[property]) {
            this.damage.push(new Damage().copy(damage))
          }
          break
      }
    }
    return this;
  }
}

export default Energy
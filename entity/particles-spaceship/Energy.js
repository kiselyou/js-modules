import Particle from './../Particle'

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
     * Объем, вместимость. Это значение будет увеличиваться путем улучшения частицы
     *
     * @type {number}
     */
    this.size = 2000
  }

  /**
   *
   * @param {number} value
   * @return {Energy}
   */
  increase(value) {
    let state = value * 100 / this.size
    this.state += (this.state + state > 100) ? 100 : state
  }

  /**
   *
   * @param {number} value
   * @return {Energy}
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
}

export default Energy
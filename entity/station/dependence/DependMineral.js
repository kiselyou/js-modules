import uuidV4 from 'uuid/v4'

/**
 * Привязка минерала к заводу.
 * Зависимость производства
 */
class DependMineral {
  constructor() {
    /**
     * @type {string}
     */
    this.className = this.constructor.name

    /**
     * @type {string}
     */
    this.id = uuidV4()

    /**
     *
     * @type {string}
     */
    this.mineralId = null

    /**
     * Количество едениц минералов для производства 1 еденицы товара
     *
     * @type {number}
     */
    this.units = 1

    /**
     * Стоимость по которой завод готов покупать минералы
     *
     * @type {number}
     */
    this.price = 1
  }

  /**
   *
   * @param {number} value
   * @returns {DependMineral}
   */
  setUnits(value) {
    this.units = value
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {DependMineral}
   */
  setPriceMax(value) {
    this.price = value
    return this
  }

  /**
   *
   * @param {string} id
   * @returns {DependMineral}
   */
  setMineralId(id) {
    this.mineralId = id
    return this
  }
}

export default DependMineral
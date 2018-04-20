import uuidV4 from 'uuid/v4'

/**
 * Привязка оборудования к заводу.
 * Зависимость производства
 */
class DependEquipment {
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
    this.equipmentId = null

    /**
     * Количество едениц оборудования для производства 1 еденицы товара
     *
     * @type {number}
     */
    this.units = 1

    /**
     * Стоимость по которой завод готов покупать оборудование
     *
     * @type {number}
     */
    this.price = 1
  }

  /**
   *
   * @param {number} value
   * @returns {DependEquipment}
   */
  setUnits(value) {
    this.units = value
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {DependEquipment}
   */
  setPriceMax(value) {
    this.price = value
    return this
  }

  /**
   *
   * @param {string} id
   * @returns {DependEquipment}
   */
  setEquipmentId(id) {
    this.equipmentId = id
    return this
  }
}

export default DependEquipment
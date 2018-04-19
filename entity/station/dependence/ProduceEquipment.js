import uuidV4 from 'uuid/v4'

/**
 * Завод производит оборудование
 */
class ProduceEquipment {
  constructor() {
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
     * Едениц производимой продукции
     *
     * @type {number}
     */
    this.units = 1

    /**
     * Стоимость обной еденицы
     *
     * @type {number}
     */
    this.priceCurrent = 25

    /**
     * Минимальная стоимость обной еденицы
     *
     * @type {number}
     */
    this.priceMin = 10

    /**
     * Максимальная стоимость обной еденицы
     *
     * @type {number}
     */
    this.priceMax = 30
  }

  /**
   *
   * @param {number} value
   * @returns {ProduceEquipment}
   */
  setUnits(value) {
    this.units = value
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {ProduceEquipment}
   */
  setPriceCurrent(value) {
    this.priceCurrent = value
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {ProduceEquipment}
   */
  setPriceMin(value) {
    this.priceMin = value
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {ProduceEquipment}
   */
  setPriceMax(value) {
    this.priceMax = value
    return this
  }

  /**
   *
   * @param {string} id
   * @returns {ProduceEquipment}
   */
  setEquipmentId(id) {
    this.equipmentId = id
    return this
  }
}

export default ProduceEquipment
import uuidV4 from 'uuid/v4'
import DependMineral from './DependMineral'
import DependEquipment from './DependEquipment'

/**
 * Завод производит оборудование
 */
class ProduceEquipment {
  constructor() {
    /**
     * @type {string}
     */
    this.entity = this.constructor.name

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

    /**
     *
     * @type {Array.<DependMineral>}
     */
    this.dependMineral = []

    /**
     *
     * @type {Array.<DependEquipment>}
     */
    this.dependEquipment = []
  }

  /**
   *
   * @param {(string|Array.<string>)} mineralId
   * @returns {ProduceEquipment}
   */
  addDependMineral(mineralId) {
    if (typeof mineralId === 'string') {
      this.dependMineral.push(new DependMineral().setMineralId(mineralId))
    } else {
      for (let id of mineralId) {
        this.dependMineral.push(new DependMineral().setMineralId(id))
      }
    }
    return this
  }

  /**
   *
   * @param {(string|Array.<string>)} equipmentId
   * @returns {ProduceEquipment}
   */
  addDependEquipment(equipmentId) {
    if (typeof equipmentId === 'string') {
      this.dependEquipment.push(new DependEquipment().setEquipmentId(equipmentId))
    } else {
      for (let id of equipmentId) {
        this.dependEquipment.push(new DependEquipment().setEquipmentId(id))
      }
    }
    return this
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
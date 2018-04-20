import uuidV4 from 'uuid/v4'
import ProduceEquipment from './dependence/ProduceEquipment'

/**
 * Завод может производить сразу несколько типов оборудования
 */
class Factory {
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
     * Название завода
     *
     * @type {string}
     */
    this.name = null

    /**
     * Размер склада с оборудованием
     *
     * @type {number}
     */
    this.sizeStockEquipment = 3000

    /**
     * Размер склада с минералами
     *
     * @type {number}
     */
    this.sizeStockMineral = 3000

    /**
     *
     * @type {Array.<ProduceEquipment>}
     */
    this.produceEquipment = []
  }

  /**
   *
   * @param {string} name
   * @returns {Factory}
   */
  setName(name) {
    this.name = name
    return this
  }

  /**
   *
   * @param {string} equipmentId
   * @returns {Factory}
   */
  addProduceEquipment(equipmentId) {
    this.produceEquipment.push(
      new ProduceEquipment()
        .setEquipmentId(equipmentId)
    )
    return this
  }
}

export default Factory
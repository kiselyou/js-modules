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
    this.entity = this.constructor.name

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
   * @param {string} id
   * @returns {Factory}
   */
  setId(id) {
    this.id = id
    return this
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
   * @param {string|Array.<string>} dependMineralId
   * @param {string|Array.<string>} [dependEquipmentId]
   * @returns {Factory}
   */
  addProduceEquipment(equipmentId, dependMineralId, dependEquipmentId = []) {
    this.produceEquipment.push(
      new ProduceEquipment()
        .setEquipmentId(equipmentId)
        .addDependEquipment(dependMineralId)
        .addDependMineral(dependEquipmentId)
    )
    return this
  }
}

export default Factory
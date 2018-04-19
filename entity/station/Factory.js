import uuidV4 from 'uuid/v4'
import DependMineral from './dependence/DependMineral'
import DependEquipment from './dependence/DependEquipment'
import ProduceEquipment from './dependence/ProduceEquipment'

/**
 * Завод может производить сразу несколько типов оборудования
 */
class Factory {
  constructor() {
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
    this.stockEquipmentSize = 3000

    /**
     * Размер склада с минералами
     *
     * @type {number}
     */
    this.stockMineralSize = 3000

    /**
     *
     * @type {Array.<ProduceEquipment>}
     */
    this.produceEquipment = []

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
   * @param {string} mineralId
   * @returns {Factory}
   */
  addDependMineral(mineralId) {
    this.dependMineral.push(
      new DependMineral()
        .setMineralId(mineralId)
    )
    return this
  }

  /**
   *
   * @param {string} equipmentId
   * @returns {Factory}
   */
  addDependEquipment(equipmentId) {
    this.dependEquipment.push(
      new DependEquipment()
        .setEquipmentId(equipmentId)
    )
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
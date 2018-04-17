import uuidV4 from 'uuid/v4'

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
  }
}

export default Factory
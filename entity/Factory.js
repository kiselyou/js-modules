import uuidV4 from 'uuid/v4'

/**
 * Завод может производит только один тип оборудования
 */
class Factory {
  constructor() {
    /**
     * @type {string}
     */
    this.id = uuidV4()

    /**
     *
     * @type {string}
     */
    this.name = null

    /**
     *
     * @type {number}
     */
    this.amountMax = 1000

    /**
     *
     * @type {number}
     */
    this.priceMin = 1

    /**
     *
     * @type {number}
     */
    this.priceMax = 1000

    /**
     * Время сбоки одной еденицы. Милисекунд
     *
     * @type {number}
     */
    this.buildTime = 10000

    /**
     *
     * @type {Equipment}
     */
    this.equipmentId = null
  }
}

export default Factory
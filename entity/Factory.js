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
     * Размер склада. Едениц
     *
     * @type {number}
     */
    this.stockSize = 1000

    /**
     * Минимальная стоимость товара
     *
     * @type {number}
     */
    this.priceMin = 1

    /**
     * Максимальная стоимость товара
     *
     * @type {number}
     */
    this.priceMax = 1000

    /**
     * Время сборки одной единицы. Миллисекунд
     *
     * @type {number}
     */
    this.buildTime = 10000

    /**
     * Оборудование которое производит текущий завод
     *
     * @type {Equipment}
     */
    this.equipmentId = null
  }
}

export default Factory
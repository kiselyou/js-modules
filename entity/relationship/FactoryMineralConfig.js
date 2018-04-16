import uuidV4 from 'uuid/v4'

/**
 * Это ссылка на минерал который необходим заводу для производства товаров (оборудования)
 * Так-же количество едениц этого минерала для изготовления одной еденицы товара (оборудования)
 */
class FactoryMineralConfig {
  constructor() {
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
     *
     * @type {string}
     */
    this.factoryId = null

    /**
     *
     * @type {number}
     */
    this.condition = 1
  }
}

export default FactoryMineralConfig
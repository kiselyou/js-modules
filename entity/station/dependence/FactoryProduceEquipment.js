import uuidV4 from 'uuid/v4'

/**
 * Завод производит оборудование
 */
class FactoryProduceEquipment {
  constructor() {
    /**
     * @type {string}
     */
    this.id = uuidV4()

    /**
     *
     * @type {string}
     */
    this.factoryId = null

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
}

export default FactoryProduceEquipment
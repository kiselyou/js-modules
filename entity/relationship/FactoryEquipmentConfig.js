import uuidV4 from 'uuid/v4'

/**
 * Это ссылка на оборудование которое необходимо заводу для производства товаров (оборудования)
 * Так-же количество едениц этого оборудование для изготовления одной еденицы товара (оборудования)
 */
class FactoryEquipmentConfig {
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

export default FactoryEquipmentConfig
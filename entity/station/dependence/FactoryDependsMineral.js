import uuidV4 from 'uuid/v4'

/**
 * Привязка минерала к заводу.
 * Зависимость производства
 */
class FactoryDependsMineral {
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
    this.mineralId = null

    /**
     * Количество едениц минералов для производства 1 еденицы товара
     *
     * @type {number}
     */
    this.units = 1

    /**
     * Стоимость по которой завод готов покупать минералы
     *
     * @type {number}
     */
    this.price = 1
  }
}

export default FactoryDependsMineral
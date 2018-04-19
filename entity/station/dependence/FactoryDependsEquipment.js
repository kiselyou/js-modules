import uuidV4 from 'uuid/v4'

/**
 * Привязка оборудования к заводу.
 * Зависимость производства
 */
class FactoryDependsEquipment {
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
     * Количество едениц оборудования для производства 1 еденицы товара
     *
     * @type {number}
     */
    this.units = 1

    /**
     * Стоимость по которой завод готов покупать оборудование
     *
     * @type {number}
     */
    this.price = 1
  }
}

export default FactoryDependsEquipment
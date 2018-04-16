import uuidV4 from 'uuid/v4'

/**
 * Для производства оборудования заводу нужны минералы
 * Устонавливаем минерал и необходимое количество для
 * генерации одной еденицы оборудования
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
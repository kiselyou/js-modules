import Particle from './../Particle'

/**
 * Завод может производить сразу несколько типов оборудования
 */
class Factory extends Particle {
  constructor() {
    super()

    /**
     * Размер склада с оборудованием
     *
     * @type {number}
     */
    this.sizeStockEquipment = 3000

    /**
     * Размер склада с минералами
     *
     * @type {number}
     */
    this.sizeStockMineral = 3000

    /**
     * ТОвары которые производит завод
     *
     * @type {Array.<string>}
     */
    this.produceEquipmentId = []

    /**
     *
     * @type {string|?}
     */
    this.raceId = null
  }

  /**
   *
   * @param {string} id
   * @returns {Factory}
   */
  setRaceId(id) {
    this.raceId = id
    return this
  }
}

export default Factory
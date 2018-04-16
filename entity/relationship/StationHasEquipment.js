import uuidV4 from 'uuid/v4'

/**
 * Склад оборудования.
 */
class StationHasEquipment {
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
    this.stationId = null

    /**
     *
     * @type {number}
     */
    this.action = StationHasEquipment.ACTION_DISABLED
  }

  /**
   * Товар заблокирован
   *
   * @type {number}
   */
  static ACTION_DISABLED = 0

  /**
   * Товар был куплен и не продается
   *
   * @type {number}
   */
  static ACTION_BOUGHT = 1

  /**
   * Товар продается
   *
   * @type {number}
   */
  static ACTION_SELL = 2
}

export default StationHasEquipment
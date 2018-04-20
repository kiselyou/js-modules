import uuidV4 from 'uuid/v4'

/**
 * 0 - Не известно,
 * 1 - Отличное,
 * 2 - Хорошее,
 * 3 - Нейтральное,
 * 4 - Враждебное,
 * 5 - Война
 */
class Status {
  constructor() {
    /**
     * @type {string}
     */
    this.entity = this.constructor.name

    /**
     * @type {string}
     */
    this.id = uuidV4()

    /**
     *
     * @type {number}
     */
    this.value = Status.UNKNOWN

    /**
     *
     * @type {string}
     */
    this.name = 'Не известно'
  }

  /**
   *
   * @param {number} value
   * @returns {Status}
   */
  setValue(value) {
    this.value = value
    return this
  }

  /**
   *
   * @param {string} name
   * @returns {Status}
   */
  setName(name) {
    this.name = name
    return this
  }

  /**
   *
   * @type {number}
   */
  static get UNKNOWN() {
    return 0
  }

  /**
   *
   * @type {number}
   */
  static get EXCELLENT() {
    return 1
  }

  /**
   *
   * @type {number}
   */
  static get GOOD() {
    return 2
  }

  /**
   *
   * @type {number}
   */
  static get NEUTRAL() {
    return 3
}

  /**
   *
   * @type {number}
   */
  static get RANCOROUS() {
    return 4
  }

  /**
   *
   * @type {number}
   */
  static get WAR() {
    return 5
  }
}

export default Status
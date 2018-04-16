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
    this.id = uuidV4()

    /**
     *
     * @type {number}
     */
    this.value = 0

    /**
     *
     * @type {string}
     */
    this.name = 'Не известно'
  }

  /**
   *
   * @type {number}
   */
  static UNKNOWN = 0

  /**
   *
   * @type {number}
   */
  static EXCELLENT = 1

  /**
   *
   * @type {number}
   */
  static GOOD = 2

  /**
   *
   * @type {number}
   */
  static NEUTRAL = 3

  /**
   *
   * @type {number}
   */
  static RANCOROUS = 4

  /**
   *
   * @type {number}
   */
  static WAR = 5
}

export default Status
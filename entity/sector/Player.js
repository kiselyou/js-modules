import uuidV4 from 'uuid/v4'
import { Vector2 }  from 'three'
import Monitor from './Monitor'
import BankAccount from './BankAccount'

class Player {
  constructor() {
    /**
     * @type {string}
     */
    this.id = uuidV4()

    /**
     *
     * @type {string}
     */
    this.name = null

    /**
     *
     * @type {string}
     */
    this.raceId = null

    /**
     *
     * @type {string}
     */
    this.sectorId = null

    /**
     *
     * @type {Monitor}
     */
    this.monitor = new Monitor()

    /**
     *
     * @type {BankAccount}
     */
    this.bankAccount = new BankAccount()

    /**
     *
     * @type {Vector2}
     */
    this.position = new Vector2()
  }

  /**
   *
   * @param {string} name
   * @returns {Player}
   */
  setName(name) {
    this.name = name
    return this
  }

  /**
   *
   * @param {string} id
   * @returns {Player}
   */
  setSectorId(id) {
    this.sectorId = id
    return this
  }

  /**
   *
   * @param {string} id
   * @returns {Player}
   */
  setRaceId(id) {
    this.raceId = id
    return this
  }

  /**
   *
   * @param {number} x
   * @param {number} y
   * @returns {Player}
   */
  setPosition(x, y) {
    this.position.set(x, y)
    return this
  }
}

export default Player
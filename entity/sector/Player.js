import uuidV4 from 'uuid/v4'
import { Vector3 }  from 'three'
import Monitor from './dependence/Monitor'
import BankAccount from './dependence/BankAccount'
import PlayerHasStation from './dependence/PlayerHasStation'

class Player {
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
     * @type {string|?}
     */
    this.name = null

    /**
     *
     * @type {string|?}
     */
    this.raceId = null

    /**
     *
     * @type {string|?}
     */
    this.sectorId = null

    /**
     *
     * @type {string|?}
     */
    this.socketId = null

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
     * @type {Vector3}
     */
    this.position = new Vector3()

    /**
     *
     * @type {Array.<PlayerHasStation>}
     */
    this.playerHasStation = []
  }

  /**
   *
   * @param {string} id
   * @returns {Player}
   */
  setId(id) {
    this.id = id
    return this
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
  setSocketId(id) {
    this.socketId = id
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
   * @param {number} z
   * @returns {Player}
   */
  setPosition(x, y, z) {
    this.position.set(x, y, z)
    return this
  }

  /**
   *
   * @param {string} stationId
   * @returns {Player}
   */
  addStation(stationId) {
    this.playerHasStation.push(
      new PlayerHasStation()
        .setStationId(stationId)
    )
    return this
  }

  /**
   *
   * @param {object} data
   * @returns {Player}
   */
  copy(data) {
    for (const property in data) {
      if (data.hasOwnProperty(property)) {
        switch (property) {
          case 'entity':
            break
          case 'monitor':
          case 'bankAccount':
          case 'position':
            this[property].copy(data[property])
            break
          case 'playerHasStation':
            for (const item of data[property]) {
              this.playerHasStation.push(
                new PlayerHasStation()
                  .copy(item)
              )
            }
            break
          default:
            this[property] = data[property]
            break
        }
      }
    }
    return this
  }

  /**
   *
   * @returns {Object}
   */
  getSwapInfo() {
    const data = {}
    const properties = ['id', 'position', 'sectorId', 'raceId', 'socketId']
    for (const property of properties) {
      switch (property) {
        default:
          data[property] = this[property]
      }
    }
    return data
  }
}

export default Player
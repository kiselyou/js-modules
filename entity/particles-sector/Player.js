import { Vector3 }  from 'three'
import Particle from './../Particle'
import * as CONST from './../../app/constants'

class Player extends Particle {
  constructor() {
    super()

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
     * @type {string|?}
     */
    this.userId = null

    /**
     * This is id of current (selected) ship
     *
     * @type {string|?}
     */
    this.spaceshipId = null

    /**
     *
     * @type {Vector3}
     */
    this.position = new Vector3()

    /**
     *
     * @type {string|?}
     */
    this.raceId = null
  }

  /**
   *
   * @param {string} id
   * @returns {Player}
   */
  setUserId(id) {
    this.userId = id
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
  setSpaceshipId(id) {
    this.spaceshipId = id
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
   * @param {object} data
   * @param {Array} [except]
   * @returns {Player}
   */
  copy(data, except = []) {
    for (const property in data) {
      if (except.includes(property)) {
        continue
      }
      if (data.hasOwnProperty(property)) {
        switch (property) {
          case 'entity':
            break
          case 'position':
            this[property].copy(data[property])
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
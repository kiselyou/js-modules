import uuidV4 from 'uuid/v4'
import { Vector3 }  from 'three'
import Monitor from './dependence/Monitor'
import BankAccount from './dependence/BankAccount'
import PlanetHasStation from './dependence/PlanetHasStation'

class Planet {
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
     * @type {string}
     */
    this.name = null

    /**
     *
     * @type {number}
     */
    this.population = 0

    /**
     *
     * @type {{radius: number, segments: number}}
     */
    this.params = {
      radius: 2,
      segments: 30
    }

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
     * @type {Vector3}
     */
    this.position = new Vector3()

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
     * @type {Array.<PlanetHasStation>}
     */
    this.planetHasStation = []

    /**
     *
     * @type {string|?}
     */
    this.parentId = null
  }

  /**
   *
   * @param {string} id
   * @returns {Planet}
   */
  setId(id) {
    this.id = id
    return this
  }

  /**
   *
   * @param {string} name
   * @returns {Planet}
   */
  setName(name) {
    this.name = name
    return this
  }

  /**
   *
   * @param {number} population
   * @returns {Planet}
   */
  setPopulation(population) {
    this.population = population
    return this
  }

  /**
   *
   * @param {{[radius]: number, [segments]: number}} params
   * @returns {Planet}
   */
  setParams(params) {
    for (const property in params) {
      if (params.hasOwnProperty(property)) {
        this.params[property] = params[property]
      }
    }
    return this
  }

  /**
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {Planet}
   */
  setPosition(x, y, z) {
    this.position.set(x, y, z)
    return this
  }

  /**
   *
   * @param {string} id
   * @returns {Planet}
   */
  setParentId(id) {
    this.parentId = id
    return this
  }

  /**
   *
   * @param {string} id
   * @returns {Planet}
   */
  setSectorId(id) {
    this.sectorId = id
    return this
  }

  /**
   *
   * @param {string} id
   * @returns {Planet}
   */
  setRaceId(id) {
    this.raceId = id
    return this
  }

  /**
   *
   * @param {string} stationId
   * @returns {Planet}
   */
  addStation(stationId) {
    this.planetHasStation.push(
      new PlanetHasStation()
        .setStationId(stationId)
    )
    return this
  }

  /**
   *
   * @param {object} data
   * @returns {Planet}
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
              this.planetHasStation.push(
                new PlanetHasStation()
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
}

export default Planet
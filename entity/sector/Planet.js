import uuidV4 from 'uuid/v4'
import { Vector2 }  from 'three'
import Monitor from './dependence/Monitor'
import BankAccount from './dependence/BankAccount'
import PlanetHasStation from './dependence/PlanetHasStation'

class Planet {
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
     * @type {number}
     */
    this.population = 0

    /**
     *
     * @type {number}
     */
    this.size = 100

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
     * @type {Vector2}
     */
    this.position = new Vector2()

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
   * @param {number} value
   * @returns {Planet}
   */
  setSize(value) {
    this.size = value
    return this
  }

  /**
   *
   * @param {number} x
   * @param {number} y
   * @returns {Planet}
   */
  setPosition(x, y) {
    this.position.set(x, y)
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
}

export default Planet
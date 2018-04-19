import uuidV4 from 'uuid/v4'
import { Vector2 } from 'three'
import StationHasFactory from './dependence/StationHasFactory'

class Station {
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
    this.sectorId = null

    /**
     *
     * @type {Vector2}
     */
    this.position = new Vector2()

    /**
     *
     * @type {Array.<StationHasFactory>}
     */
    this.stationHasFactory = []
  }

  /**
   *
   * @param {string} name
   * @returns {Station}
   */
  setName(name) {
    this.name = name
    return this
  }

  /**
   *
   * @param {number} x
   * @param {number} y
   * @returns {Station}
   */
  setPosition(x, y) {
    this.position.set(x, y)
    return this
  }

  /**
   *
   * @param {string} id
   * @returns {Station}
   */
  setSectorId(id) {
    this.sectorId = id
    return this
  }

  /**
   *
   * @param {string} id
   * @returns {Station}
   */
  addFactory(id) {
    this.stationHasFactory.push(
      new StationHasFactory().setFactoryId(id)
    )
    return this
  }
}

export default Station
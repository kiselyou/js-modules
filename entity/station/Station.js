import uuidV4 from 'uuid/v4'
import { Mesh } from 'three'
import StationHasFactory from './dependence/StationHasFactory'

class Station {
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
    this.sectorId = null

    /**
     *
     * @type {number}
     */
    this.angleToCenter = 0

    /**
     *
     * @type {number}
     */
    this.distanceToCenter = 0

    /**
     *
     * @type {number}
     */
    this.speedMove = 0

    /**
     *
     * @type {Array.<StationHasFactory>}
     */
    this.stationHasFactory = []

    /**
     *
     * @type {Mesh}
     */
    this.model = new Mesh()
  }

  /**
   *
   * @param {string} id
   * @returns {Station}
   */
  setId(id) {
    this.id = id
    return this
  }

  /**
   * Distance to center of Sector
   *
   * @param {number} value
   * @returns {Station}
   */
  setDistanceToCenter(value) {
    this.distanceToCenter = value
    return this
  }

  /**
   *
   * @param {number} degree
   * @returns {Station}
   */
  setAngleToCenter(degree) {
    this.angleToCenter = degree
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {Station}
   */
  setSpeedMove(value) {
    this.speedMove = value
    return this
  }

  /**
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {Station}
   */
  setRotation(x, y, z) {
    this.model.rotation.set(x, y, z)
    return this
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
    this.model.position.set(x, y)
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

  /**
   *
   * @param {object} data
   * @returns {Station}
   */
  copy(data) {
    for (const property in data) {
      if (data.hasOwnProperty(property)) {
        switch (property) {
          case 'entity':
          case 'model':
            break
          case 'stationHasFactory':
            for (const item of data[property]) {
              this.stationHasFactory.push(
                new StationHasFactory()
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
   * @param {number} delta
   * @returns {Station}
   */
  calculatePosition(delta = 1) {
    let x = 0, z = 0;
    this.angleToCenter += this.speedMove * delta
    this.model.position.setX(x + this.distanceToCenter * Math.cos(this.angleToCenter))
    this.model.position.setZ(z + this.distanceToCenter * Math.sin(this.angleToCenter))
    return this
  }
}

export default Station
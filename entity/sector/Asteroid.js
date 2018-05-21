import AsteroidHasMineral from './dependence/AsteroidHasMineral'
import { Mesh } from 'three'
import uuidV4 from 'uuid/v4'

class Asteroid {
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
     * @type {number}
     */
    this.size = 10

    /**
     *
     * @type {Array.<AsteroidHasMineral>}
     */
    this.asteroidHasMineral = []

    /**
     *
     * @type {Mesh}
     */
    this.model = new Mesh()
  }

  /**
   *
   * @param {string} id
   * @returns {Asteroid}
   */
  setId(id) {
    this.id = id
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {Asteroid}
   */
  setSize(value) {
    this.size = value
    return this
  }

  /**
   * Distance to center of Sector
   *
   * @param {number} value
   * @returns {Asteroid}
   */
  setDistanceToCenter(value) {
    this.distanceToCenter = value
    return this
  }

  /**
   *
   * @param {number} degree
   * @returns {Asteroid}
   */
  setAngleToCenter(degree) {
    this.angleToCenter = degree
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {Asteroid}
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
   * @returns {Asteroid}
   */
  setRotation(x, y, z) {
    this.model.rotation.set(x, y, z)
    return this
  }

  /**
   *
   * @param {string} name
   * @returns {Asteroid}
   */
  setName(name) {
    this.name = name
    return this
  }

  /**
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {Asteroid}
   */
  setPosition(x, y, z) {
    this.model.position.set(x, y, z)
    return this
  }

  /**
   *
   * @param {string} id
   * @returns {Asteroid}
   */
  setSectorId(id) {
    this.sectorId = id
    return this
  }

  /**
   *
   * @param {string} id
   * @param {number} units
   * @returns {Asteroid}
   */
  addMineral(id, units) {
    this.asteroidHasMineral.push(
      new AsteroidHasMineral()
        .setMineralId(id)
        .setUnits(units)
    )
    return this
  }

  /**
   *
   * @param {object} data
   * @returns {Asteroid}
   */
  copy(data) {
    for (const property in data) {
      if (data.hasOwnProperty(property)) {
        switch (property) {
          case 'entity':
          case 'model':
            break
          case 'position':
          case 'rotation':
            this[property].copy(data[property])
            break
          case 'asteroidHasMineral':
            for (const item of data[property]) {
              this.asteroidHasMineral.push(
                new AsteroidHasMineral()
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
   * @returns {Asteroid}
   */
  calculatePosition(delta = 1) {
    let x = 0, z = 0;
    this.angleToCenter += this.speedMove * delta
    this.model.position.setX(x + this.distanceToCenter * Math.cos(this.angleToCenter))
    this.model.position.setZ(z + this.distanceToCenter * Math.sin(this.angleToCenter))
    return this
  }
}

export default Asteroid
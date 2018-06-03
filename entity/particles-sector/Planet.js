import Particle from './../Particle'
import PlanetGlow from './../PlanetGlow'

class Planet extends Particle {
  constructor() {
    super()

    /**
     *
     * @type {number}
     */
    this.population = 0

    /**
     *
     * @type {number}
     */
    this.radius = 2

    /**
     *
     * @type {number}
     */
    this.segmentCount = 40

    /**
     *
     * @type {string|number|?}
     */
    this.textureMapKey = null

    /**
     *
     * @type {number|?}
     */
    this.textureMapSpecular = null

    /**
     *
     * @type {string|number|?}
     */
    this.textureBumpKey = null

    /**
     *
     * @type {number|?}
     */
    this.textureBumpScale = null

    /**
     *
     * @type {PlanetGlow}
     */
    this.glowInsideOption = new PlanetGlow()

    /**
     *
     * @type {PlanetGlow}
     */
    this.glowOutsideOption = new PlanetGlow()

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
     * @type {string|?}
     */
    this.parentId = null

    /**
     *
     * @type {string|?}
     */
    this.raceId = null
  }

  /**
   *
   * @param {number} value
   * @returns {Planet}
   */
  setRadius(value) {
    this.radius = value
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {Planet}
   */
  setSegmentCount(value) {
    this.segmentCount = value
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
   * Distance to center of Sector or parent Planet
   *
   * @param {number} value
   * @returns {Planet}
   */
  setDistanceToCenter(value) {
    this.distanceToCenter = value
    return this
  }

  /**
   *
   * @param {number} degree
   * @returns {Planet}
   */
  setAngleToCenter(degree) {
    this.angleToCenter = degree
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {Planet}
   */
  setSpeedMove(value) {
    this.speedMove = value
    return this
  }

  /**
   *
   * @param {{[color]: number, [coefficient]: number, [power]: number, [length]: number}} options
   * @returns {Planet}
   */
  setGlowInside(options) {
    this.glowInsideOption.enable().copy(options)
    return this
  }

  /**
   *
   * @param {{[color]: number, [coefficient]: number, [power]: number, [length]: number}} options
   * @returns {Planet}
   */
  setGlowOutside(options) {
    this.glowOutsideOption.enable().copy(options)
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
   * @param {string|number} value
   * @param {number} specular
   * @returns {Planet}
   */
  setTextureMapKey(value, specular) {
    this.textureMapKey = value
    this.textureMapSpecular = specular
    return this
  }

  /**
   *
   * @param {string|number} value
   * @param {number} scale
   * @returns {Planet}
   */
  setTextureBumpKey(value, scale) {
    this.textureBumpKey = value
    this.textureBumpScale = scale
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
   * @returns {Object}
   */
  getSwapInfo() {
    const data = {}
    const properties = ['id', 'angleToCenter']
    for (const property of properties) {
      switch (property) {
        default:
          data[property] = this[property]
      }

    }
    return data
  }
}

export default Planet
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
     * @type {string|?}
     */
    this.name = null

    /**
     *
     * @type {number}
     */
    this.population = 0

    /**
     *
     * @type {{radius: number, segments: number, texturesKey: {specular: number, map: string|?, bump: {key: string|?, scale: number|?}, cloudMap: string|?, cloudMapTrans: string|?, spec: string|?}}}
     */
    this.params = {
      radius: 2,
      segments: 30,
      texturesKey: {
        specular: 0x000000,
        map: null,
        bump: {
          key: null,
          scale: null
        },
        cloudMap: null,
        cloudMapTrans: null,
        spec: null
      }
    }

    /**
     *
     * @type {{inside: {enabled: boolean, color: number, coefficient: number, power: number, length: number}, outside: {enabled: boolean, color: number, coefficient: number, power: number, length: number}}}
     */
    this.glow = {
      inside: {
        enabled: false,
        color: 0xFFFFFF,
        coefficient: 0.5,
        power: 1.7,
        length: 1.5
      },
      outside: {
        enabled: false,
        color: 0xFF0000,
        coefficient: 0.46,
        power: 5,
        length: 1
      }
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
     * @type {Vector3}
     */
    this.rotation = new Vector3()

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
    this.speedMove = 0.00001

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

    /**
     *
     * @type {Planet|?}
     */
    this.parent = null
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
    this.glow.inside.enabled = true
    for (const property in options) {
      if (options.hasOwnProperty(property)) {
        this.glow.inside[property] = options[property]
      }
    }
    return this
  }

  /**
   *
   * @param {{[color]: number, [coefficient]: number, [power]: number, [length]: number}} options
   * @returns {Planet}
   */
  setGlowOutside(options) {
    this.glow.outside.enabled = true
    for (const property in options) {
      if (options.hasOwnProperty(property)) {
        this.glow.outside[property] = options[property]
      }
    }
    return this
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
   * @param {{[specular]: number, map: string, [bump]: {key: string, scale: number}, [cloudMap]: string, [cloudMapTrans]: string, [spec]: string}} params
   * @returns {Planet}
   */
  setTextures(params) {
    for (const property in params) {
      if (params.hasOwnProperty(property)) {
        this.params.texturesKey[property] = params[property]
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
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {Planet}
   */
  setRotation(x, y, z) {
    this.rotation.set(x, y, z)
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

  /**
   *
   * @param {Planet} planet
   * @returns {Planet}
   */
  setParentPlanet(planet) {
    this.parent = planet
    return this
  }

  /**
   *
   * @param {number} delta
   * @returns {Planet}
   */
  calculatePosition(delta = 1) {
    let x = 0, z = 0;
    if (this.parent) {
      x = this.parent.position.x
      z = this.parent.position.z
    }

    this.angleToCenter += this.speedMove * delta
    this.position.setX(x + this.distanceToCenter * Math.cos(this.angleToCenter))
    this.position.setZ(z + this.distanceToCenter * Math.sin(this.angleToCenter))
    return this
  }
}

export default Planet
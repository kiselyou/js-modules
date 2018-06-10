import uuidV4 from 'uuid/v4'
import Universe from './Universe'
import Player from './particles-sector/Player'
import Sector from './particles-sector/Sector'

import Star from './particles-sector/Star'
import Slot from './particles-spaceship/Slot'
import Planet from './particles-sector/Planet'
import Station from './particles-sector/Station'
import Asteroid from './particles-sector/Asteroid'
import StarLight from './particles-sector/StarLight'
import Spaceship from './particles-spaceship/Spaceship'
import SectorHasParticle from './dependence/SectorHasParticle'
import PlayerHasParticle from './dependence/PlayerHasParticle'

class ParticlePlayGround {
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
     * This is current player
     *
     * @type {Player}
     */
    this.player = new Player()

    /**
     * This is current sector
     *
     * @type {Sector}
     */
    this.sector = new Sector()

    /**
     *
     * @type {Universe}
     */
    this.universe = new Universe()

    /**
     *
     * @type {Array.<Player|Particle>}
     */
    this.players = [this.player]//TODO: socket test the same ship

    /**
     *
     * @type {Array.<Sector|Particle>}
     */
    this.sectors = [this.sector]//TODO: socket test the same ship

    /**
     *
     * @type {Array.<SectorHasParticle>}
     */
    this.sectorHasParticle = []

    /**
     *
     * @type {Array.<PlayerHasParticle>}
     */
    this.playerHasParticle = []
  }

  /**
   * Set current player
   *
   * @param {Object} data
   * @returns {ParticlePlayGround}
   */
  setPlayer(data) {
    this.player.copy(data)
    return this
  }

  /**
   * Set current sector
   *
   * @param {Object} data
   * @returns {ParticlePlayGround}
   */
  setSector(data) {
    this.sector.copy(data)
    return this
  }

  /**
   *
   * @param {Object} data
   * @returns {ParticlePlayGround}
   */
  addPlayer(data) {
    this.players.push(new Player().copy(data))
    return this
  }

  /**
   *
   * @returns {Player}
   */
  getCurrentPlayer() {
    return this.player
  }

  /**
   *
   * @param {string} id
   * @returns {Player|?}
   */
  getPlayerById(id) {
    for (const item of this.players) {
      if (item.id === id) {
        return new Player().copy(item)
      }
    }
    return null
  }

  /**
   *
   * @param {string} slotId
   * @returns {Particle|?}
   */
  getPlayerParticleBySlotId(slotId) {
    if ( ! slotId) {
      return null
    }
    for (const item of this.playerHasParticle) {
      if (item.slotId === slotId) {
        return item.particle
      }
    }
    return null
  }

  /**
   * Give copy of object
   *
   * @param {string} id
   * @returns {Spaceship|?}
   */
  getSpaceshipById(id) {
    for (const item of this.playerHasParticle) {
      if (item.particle.id === id && item.particle.entity === 'Spaceship') {
        const spaceship = new Spaceship().copy(item.particle)
        for (const slot of spaceship.slot) {
          slot.copyParticle(this.getPlayerParticleBySlotId(slot.id))
        }
        return spaceship
      }
    }
    return null
  }

  /**
   *
   * @param {Object} data
   * @returns {ParticlePlayGround}
   */
  addSector(data) {
    this.sectors.push(new Sector().copy(data))
    return this
  }

  /**
   *
   * @returns {Sector}
   */
  getCurrentSector() {
    return this.sector
  }

  /**
   *
   * @param {string} id
   * @returns {Sector|?}
   */
  getSectorById(id) {
    for (const item of this.sectors) {
      if (item.id === id) {
        return new Sector().copy(item)
      }
    }
    return null
  }

  /**
   *
   * @param {Object} data
   * @returns {ParticlePlayGround}
   */
  setUniverse(data) {
    this.universe.copy(data)
    return this
  }

  /**
   *
   * @param {Array.<Object>} data
   * @returns {ParticlePlayGround}
   */
  setSectorHasParticle(data) {
    for (const particle of data) {
      this.sectorHasParticle.push(new SectorHasParticle().copy(particle))
    }
    return this
  }

  /**
   * @returns {Array.<Planet>}
   */
  getPlanets() {
    const planets = []
    for (const item of this.sectorHasParticle) {
      if (item.particle.entity === 'Planet') {
        planets.push(new Planet().copy(item.particle))
      }
    }
    return planets
  }

  /**
   *
   * @param {string} id
   * @returns {Planet|?}
   */
  getPlanet(id) {
    for (const item of this.sectorHasParticle) {
      if (item.particle.entity === 'Planet' && item.particle.id === id) {
        return new Planet().copy(item.particle)
      }
    }
    return null
  }

  /**
   * @returns {Array.<Asteroid>}
   */
  getAsteroids() {
    const planets = []
    for (const item of this.sectorHasParticle) {
      if (item.particle.entity === 'Asteroid') {
        planets.push(new Asteroid().copy(item.particle))
      }
    }
    return planets
  }

  /**
   *
   * @param {string} id
   * @returns {Asteroid|?}
   */
  getAsteroid(id) {
    for (const item of this.sectorHasParticle) {
      if (item.particle.entity === 'Asteroid' && item.particle.id === id) {
        return new Asteroid().copy(item.particle)
      }
    }
    return null
  }

  /**
   * @returns {Array.<Station>}
   */
  getStations() {
    const planets = []
    for (const item of this.sectorHasParticle) {
      if (item.particle.entity === 'Station') {
        planets.push(new Station().copy(item.particle))
      }
    }
    return planets
  }

  /**
   *
   * @param {string} id
   * @returns {Station|?}
   */
  getStation(id) {
    for (const item of this.sectorHasParticle) {
      if (item.particle.entity === 'Station' && item.particle.id === id) {
        return new Station().copy(item.particle)
      }
    }
    return null
  }

  /**
   * @returns {Array.<Star>}
   */
  getStars() {
    const planets = []
    for (const item of this.sectorHasParticle) {
      if (item.particle.entity === 'Star') {
        planets.push(new Star().copy(item.particle))
      }
    }
    return planets
  }

  /**
   *
   * @param {string} id
   * @returns {Star|?}
   */
  getStar(id) {
    for (const item of this.sectorHasParticle) {
      if (item.particle.entity === 'Star' && item.particle.id === id) {
        return new Star().copy(item.particle)
      }
    }
    return null
  }

  /**
   * @returns {Array.<StarLight>}
   */
  getStarLights() {
    const planets = []
    for (const item of this.sectorHasParticle) {
      if (item.particle.entity === 'StarLight') {
        planets.push(new StarLight().copy(item.particle))
      }
    }
    return planets
  }

  /**
   *
   * @param {string} id
   * @returns {StarLight|?}
   */
  getStarLight(id) {
    for (const item of this.sectorHasParticle) {
      if (item.particle.entity === 'StarLight' && item.particle.id === id) {
        return new StarLight().copy(item.particle)
      }
    }
    return null
  }

  /**
   *
   * @param {Array.<Object>} data
   * @returns {ParticlePlayGround}
   */
  setPlayerHasParticle(data) {
    for (const particle of data) {
      this.playerHasParticle.push(new PlayerHasParticle().copy(particle))
    }
    return this
  }

  /**
   *
   * @param {Object} data
   * @param {Array} [except]
   * @returns {ParticlePlayGround}
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
          case 'player':
          case 'sector':
          case 'universe':
            this[property].copy(data[property])
            break
          case 'sectorHasParticle':
            this.setSectorHasParticle(data[property])
            break
          case 'playerHasParticle':
            this.setPlayerHasParticle(data[property])
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
   * @param {Object} data
   * @returns {ParticlePlayGround}
   */
  jsonToObject(data) {
    try {
      const particleGround = JSON.parse(data)
      this.copy(particleGround)
    } catch (e) {
      new Error('new ParticlePlayGround().jsonToObject() data is not correct')
    }
    return this
  }

  /**
   *
   * @returns {string}
   */
  toJson() {
    return JSON.stringify(this)
  }
}

export default ParticlePlayGround
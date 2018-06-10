import User from './User'
import Spaceship from './particles-spaceship/Spaceship'
import Sector from './particles-sector/Sector'
import Race from './particles-sector/Race'

class AppConfig {
  constructor() {
    /**
     *
     * @type {string|?}
     */
    this.apiBaseUrl = null

    /**
     *
     * @type {string|?}
     */
    this.socketPlayProcessUrl = null

    /**
     *
     * @type {User|?}
     */
    this.user = new User()

    /**
     *
     * @type {string}
     */
    this.version = '0.0.0'

    /**
     *
     * @type {Array.<Spaceship>}
     */
    this.defaultModels = []

    /**
     *
     * @type {Array.<string>}
     */
    this.defaultModelIds = []

    /**
     *
     * @type {Array.<Sector>}
     */
    this.defaultSector = []

    /**
     *
     * @type {Array.<Race>}
     */
    this.defaultRace = []
  }

  /**
   *
   * @param {string} key
   * @returns {AppConfig}
   */
  addDefaultModelIds(key) {
    this.defaultModelIds.push(key)
    return this
  }

  /**
   *
   * @param {Array.<Spaceship|Object>} items
   * @returns {AppConfig}
   */
  setDefaultModels(items) {
    for (const item of items) {
      this.addDefaultModel(item)
    }
    return this
  }

  /**
   *
   * @param {Spaceship|Object} value
   * @returns {AppConfig}
   */
  addDefaultModel(value) {
    const model = value instanceof Spaceship ? value : new Spaceship().copy(value)
    this.defaultModels.push(model)
    return this
  }

  /**
   *
   * @param {Sector|Object} value
   * @returns {AppConfig}
   */
  addDefaultSector(value) {
    const sector = value instanceof Sector ? value : new Sector().copy(value)
    this.defaultSector.push(sector)
    return this
  }

  /**
   *
   * @param {Array.<Sector|Object>} items
   * @returns {AppConfig}
   */
  setDefaultSectors(items) {
    for (const item of items) {
      this.addDefaultSector(item)
    }
    return this
  }

  /**
   *
   * @param {Race|Object} value
   * @returns {AppConfig}
   */
  addDefaultRace(value) {
    const race = value instanceof Race ? value : new Race().copy(value)
    this.defaultSector.push(race)
    return this
  }

  /**
   *
   * @param {Array.<Race|Object>} items
   * @returns {AppConfig}
   */
  setDefaultRaces(items) {
    for (const item of items) {
      this.addDefaultRace(item)
    }
    return this
  }

  /**
   *
   * @param {string} value
   * @returns {AppConfig}
   */
  setVersion(value) {
    this.version = value
    return this
  }

  /**
   *
   * @param {string} value
   * @returns {AppConfig}
   */
  setApiBaseUrl(value) {
    this.apiBaseUrl = value
    return this
  }

  /**
   *
   * @param {string} value
   * @returns {AppConfig}
   */
  setSocketPlayProcessUrl(value) {
    this.socketPlayProcessUrl = value
    return this
  }

  /**
   *
   * @param {User|Object} value
   * @returns {AppConfig}
   */
  setUser(value) {
    this.user.copy(value)
    return this
  }

  /**
   *
   * @param {Object} data
   * @param {Array} [except]
   * @returns {AppConfig}
   */
  copy(data, except = []) {
    for (const property in data) {
      if ( ! this.hasOwnProperty(property)) {
        continue
      }

      if (except.includes(property)) {
        continue
      }

      if (data.hasOwnProperty(property)) {
        switch (property) {
          case 'entity':
            break
          case 'defaultModels':
            this.setDefaultModels(data[property])
            break
          case 'user':
            this.user.copy(data[property])
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
   * @param {string} json
   * @returns {AppConfig}
   */
  fromJSON(json) {
    try {
      const config = JSON.parse(json)
      this.copy(config)
      return this
    } catch (e) {
      return this
    }
  }
}

export default AppConfig
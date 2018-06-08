import User from './User'

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
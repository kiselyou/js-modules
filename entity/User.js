import Particle from './Particle'

class User extends Particle {
  constructor() {
    super()

    /**
     *
     * @type {string|?}
     */
    this.email = null

    /**
     *
     * @type {string|?}
     */
    this.password = null
  }

  /**
   *
   * @returns {boolean}
   */
  get isAuthorized() {
    return Boolean(this.email)
  }

  /**
   *
   * @param {string} value
   * @returns {User}
   */
  setEmail(value) {
    this.email = value
    return this
  }

  /**
   *
   * @param {string} value
   * @returns {User}
   */
  setPassword(value) {
    this.password = value
    return this
  }

  /**
   *
   * @param {Object} data
   * @param {Array} [except]
   * @returns {User}
   */
  copy(data, except = []) {
    super.copy(data, except.concat(['password']))
    return this
  }
}

export default User
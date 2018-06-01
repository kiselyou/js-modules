import uuidV4 from 'uuid/v4'

class PlayerHasSpaceship {
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
    this.playerId = null

    /**
     *
     * @type {string|?}
     */
    this.spaceshipId = null

    /**
     *
     * @type {Spaceship|?}
     */
    this.spaceship = null
  }

  /**
   *
   * @param {string} value
   * @returns {PlayerHasSpaceship}
   */
  setId(value) {
    this.id = value
    return this
  }

  /**
   *
   * @param {string} value
   * @returns {PlayerHasSpaceship}
   */
  setPlayerId(value) {
    this.playerId = value
    return this
  }

  /**
   *
   * @param {string} value
   * @returns {PlayerHasSpaceship}
   */
  setSpaceshipId(value) {
    this.spaceshipId = value
    return this
  }

  /**
   *
   * @param {Spaceship} spaceship
   * @returns {PlayerHasSpaceship}
   */
  setSpaceship(spaceship) {
    this.spaceship = spaceship
    return this
  }
}

export default PlayerHasSpaceship
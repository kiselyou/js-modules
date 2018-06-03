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
     * Ссылка на владельца частицы
     *
     * @type {string|?}
     */
    this.playerId = null

    /**
     * Модель. Содержит актуальную информацию о карабле
     *
     * @type {Spaceship|Particle|?}
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
   * @param {Spaceship} spaceship
   * @returns {PlayerHasSpaceship}
   */
  setSpaceship(spaceship) {
    this.spaceship = spaceship
    return this
  }

  /**
   *
   * @param {Object} data
   * @param {Array} [except]
   * @returns {PlayerHasSpaceship}
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
          default:
            this[property] = data[property]
            break
        }
      }
    }
    return this
  }
}

export default PlayerHasSpaceship
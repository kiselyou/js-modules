import uuidV4 from 'uuid/v4'

class PlayerHasParticle {
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
     * Ссылка на слот в которм установдена частица
     *
     * @type {string|?}
     */
    this.slotId = null

    /**
     * Ссылка на владельца частицы
     *
     * @type {string|?}
     */
    this.playerId = null

    /**
     * Модель. Содержит актуальную информацию о частице
     *
     * @type {Particle|?}
     */
    this.particle = null
  }

  /**
   *
   * @param {string} value
   * @returns {PlayerHasParticle}
   */
  setId(value) {
    this.id = value
    return this
  }

  /**
   *
   * @param {string} value
   * @returns {PlayerHasParticle}
   */
  setSlotId(value) {
    this.slotId = value
    return this
  }

  /**
   *
   * @param {string} value
   * @returns {PlayerHasParticle}
   */
  setPlayerId(value) {
    this.playerId = value
    return this
  }

  /**
   *
   * @param {Particle} value
   * @returns {PlayerHasParticle}
   */
  setParticle(value) {
    this.particle = value
    return this
  }

  /**
   *
   * @param {Object} data
   * @param {Array} [except]
   * @returns {PlayerHasParticle}
   */
  copy(data, except = []) {
    for (const property in data) {
      if ( ! data.hasOwnProperty(property)) {
        continue
      }

      if (except.includes(property)) {
        continue
      }

      switch (property) {
        case 'entity':
          break
        default:
          this[property] = data[property]
          break
      }
    }
    return this
  }
}

export default PlayerHasParticle
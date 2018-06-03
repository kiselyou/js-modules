import uuidV4 from 'uuid/v4'

class SectorHasParticle {
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
     * Ссылка на сектор в котором находятся частицы
     *
     * @type {string|?}
     */
    this.sectorId = null

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
   * @returns {SectorHasParticle}
   */
  setId(value) {
    this.id = value
    return this
  }

  /**
   *
   * @param {string} value
   * @returns {SectorHasParticle}
   */
  setSectorId(value) {
    this.sectorId = value
    return this
  }

  /**
   *
   * @param {Particle} value
   * @returns {SectorHasParticle}
   */
  setParticle(value) {
    this.particle = value
    return this
  }

  /**
   *
   * @param {Object} data
   * @param {Array} [except]
   * @returns {SectorHasParticle}
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

export default SectorHasParticle
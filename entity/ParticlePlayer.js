import uuidV4 from 'uuid/v4'
import Player from './../entity/particles-sector/Player'
import PlayerHasParticle from './../entity/dependence/PlayerHasParticle'

class ParticlePlayer {
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
     * @type {Player}
     */
    this.player = new Player()

    /**
     *
     * @type {Array.<PlayerHasParticle>}
     */
    this.playerHasParticle = []
  }

  /**
   *
   * @param {Object} data
   * @returns {ParticlePlayer}
   */
  setPlayer(data) {
    this.player.copy(data)
    return this
  }

  /**
   *
   * @param {Array.<Object>} data
   * @returns {ParticlePlayer}
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
   * @returns {ParticlePlayer}
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
            this[property].copy(data[property])
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
   * @returns {ParticlePlayer}
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

export default ParticlePlayer
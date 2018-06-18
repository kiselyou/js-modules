import ModelSpaceParticle from './models/space-particle/ModelSpaceParticle'

class SpaceParticleControls {
  /**
   *
   * @param {CharacterControls} character
   * @param {Loader} loader
   */
  constructor(character, loader) {
    /**
     * @type {CharacterControls}
     */
    this.character = character

    /**
     *
     * @type {Loader}
     */
    this.loader = loader

    /**
     *
     * @type {ModelSpaceParticles}
     */
    this.model = new ModelSpaceParticle(this.character)

    /**
     *
     * @type {boolean}
     */
    this.enabled = true
  }

  /**
   * @returns {void}
   */
  async beforeStart() {
    this.model.makeParticles(this.loader)
  }

  /**
   *
   * @param {number} delta
   * @returns {void}
   */
  update(delta) {
    if (this.enabled) {
      const speed = this.character.engine.speed
      const maxSpeed = this.character.engine.maxSpeed
      this.model
        .setSpeed(maxSpeed)
        .setOpacity(speed / maxSpeed)
        .update(delta)
    }
  }
}

export default SpaceParticleControls
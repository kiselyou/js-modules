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
    this.enabled = false
  }

  /**
   * @returns {void}
   */
  async beforeStart() {
    this.model.makeParticles(this.loader)
    this.enabled = true
  }

  /**
   *
   * @param {number} delta
   * @returns {void}
   */
  update(delta) {
    if (this.enabled) {
      const engine = this.character.spaceship.getEngine()
      this.model
        .setSpeed(engine.maxSpeed / 3)
        .setOpacity((engine.speed / engine.maxSpeed) * 1.5)
        .update(delta)
    }
  }
}

export default SpaceParticleControls
import ModelSpaceParticle from './models/space-particle/ModelSpaceParticle'
import { RIGHT, LEFT, FORWARD, BACKWARD, SLOWDOWN } from './MoveControls'

class SpaceParticleControls {
  /**
   *
   * @param {CharacterControls} character
   */
  constructor(character) {
    /**
     * @type {CharacterControls}
     */
    this.character = character

    /**
     *
     * @type {ModelSpaceParticles}
     */
    this.model = new ModelSpaceParticle()

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
    this.model.makeParticles()
    this.character.addMoveEventListener((moveSwapInfo, action) => {
      switch (action) {
        case RIGHT:

          break
        case LEFT:

          break
        case FORWARD:
          this.model.speed = moveSwapInfo.engine.speed * 10
          break
        case BACKWARD:
          this.model.speed = moveSwapInfo.engine.speed * 10
          break
        case SLOWDOWN:
          this.model.speed = moveSwapInfo.engine.speed * 10
          break
      }
      console.log(moveSwapInfo, action)
    })
  }

  /**
   *
   * @param {number} delta
   * @returns {void}
   */
  update(delta) {
    if (this.enabled) {
      this.model.update(delta)
      this.model.position.copy(this.character.position)
    }
  }
}

export default SpaceParticleControls
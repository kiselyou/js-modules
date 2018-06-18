import { AdditiveBlending, Object3D, Sprite, SpriteMaterial, Vector3, Quaternion } from 'three'
import * as CONST from '@app/constants'

class ModelSpaceParticles extends Object3D {
  constructor(character) {
    super()

    /**
     * @type {CharacterControls}
     */
    this.character = character

    /**
     *
     * @type {number}
     */
    this.ariaSize = 8000

    /**
     *
     * @type {number}
     */
    this.count = 100

    /**
     *
     * @type {number}
     */
    this.spriteScale = 10

    /**
     *
     * @type {number}
     */
    this.speed = 0

    /**
     *
     * @type {number}
     */
    this.minSpeed = 20

    /**
     *
     * @type {number}
     */
    this.opacity = 0

    /**
     *
     * @type {Vector3}
     * @private
     */
    this._startPoint = new Vector3()
  }

  /**
   *
   * @param {number} value
   * @returns {ModelSpaceParticles}
   */
  setSpeed(value) {
    this.speed = value
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {ModelSpaceParticles}
   */
  setMinSpeed(value) {
    this.minSpeed = value
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {ModelSpaceParticles}
   */
  setOpacity(value) {
    this.opacity = value
    for (const particle of this.children) {
      particle.material.opacity = this.opacity
    }
    return this
  }

  /**
   *
   * @param {Loader} loader
   * @returns {ModelSpaceParticles}
   */
  makeParticles(loader) {
    this.position.copy(this.character.model.position)

    const direction = this.character.getDirection()
    this._startPoint.addScaledVector(direction, this.ariaSize)

    const count = this.ariaSize / this.count
    for ( let zpos = this.ariaSize; zpos > - this.ariaSize; zpos -= count ) {
      const material = new SpriteMaterial({
        transparent: true,
        opacity: this.opacity,
        blending: AdditiveBlending,
        map: loader.getTexture(CONST.KEY_LIGHT_CONTROLS_15)
      })

      const particle = new Sprite(material)
      particle.position.addScaledVector(direction, zpos)
      particle.position.x += Math.random() * this.ariaSize - (this.ariaSize / 2)
      particle.position.y += Math.random() * this.ariaSize - (this.ariaSize / 2)
      particle.position.z += Math.random() * this.ariaSize - (this.ariaSize / 2)
      particle.userData.start = new Vector3().copy(this._startPoint)

      particle.scale.x = this.spriteScale
      particle.scale.y = this.spriteScale
      this.add(particle);
    }
    return this
  }

  /**
   *
   * @returns {number}
   * @private
   */
  get _speed() {
    return this.speed < this.minSpeed ? this.minSpeed : this.speed
  }

  /**
   *
   * @param {number} delta
   * @returns {void}
   */
  update(delta) {
    this.position.copy(this.character.model.position)
    for(let i = 0; i < this.children.length; i++) {
      let particle = this.children[i]

      const direction = this.character.getDirection()
      particle.position.addScaledVector(direction, - this._speed)

      if (particle.position.distanceTo(particle.userData.start) > this.ariaSize * 2) {
        const direction = this.character.getDirection()
        this._startPoint.set(0, 0, 0)
        this._startPoint.addScaledVector(direction, this.ariaSize)

        particle.position.copy(this._startPoint)
        particle.userData.start.copy(this._startPoint)
        particle.position.x += Math.random() * this.ariaSize - (this.ariaSize / 2)
        particle.position.y += Math.random() * this.ariaSize - (this.ariaSize / 2)
        particle.position.z += Math.random() * this.ariaSize - (this.ariaSize / 2)
      }
    }
  }
}

export default ModelSpaceParticles
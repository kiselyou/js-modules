import {Object3D, Sprite, SpriteMaterial} from 'three'

class ModelSpaceParticles extends Object3D {
  constructor() {
    super()

    /**
     *
     * @type {number}
     */
    this.ariaSize = 8000

    /**
     *
     * @type {number}
     */
    this.count = this.ariaSize / 100

    /**
     *
     * @type {number}
     */
    this.spriteScale = 5

    /**
     *
     * @type {number}
     */
    this.speed = 0

    /**
     *
     * @type {number}
     */
    this.opacity = 1
  }

  /**
   *
   * @returns {ModelSpaceParticles}
   */
  makeParticles() {
    // we're gonna move from z position -1000 (far away)
    // to 1000 (where the camera is) and add a random particle at every pos.
    for ( let zpos = this.ariaSize; zpos > - this.ariaSize; zpos -= this.count ) {

      // we make a particle material and pass through the
      // colour and custom particle render function we defined.
      const material = new SpriteMaterial( { color: 0xffffff, transparent: true, opacity: this.opacity } )
      // make the particle
      const particle = new Sprite(material)

      // give it a random x and y position between -500 and 500
      particle.position.x = Math.random() * this.ariaSize - (this.ariaSize / 2)
      particle.position.y = Math.random() * this.ariaSize - (this.ariaSize / 2)

      // set its z position
      particle.position.z = zpos

      // scale it up a bit
      particle.scale.x = this.spriteScale
      particle.scale.y = this.spriteScale

      this.add(particle);
    }
    return this
  }

  /**
   *
   * @param {number} delta
   * @returns {void}
   */
  update(delta) {
    for(let i = 0; i < this.children.length; i++) {
      let particle = this.children[i]
      particle.position.z -= this.speed * 0.1;

      // if the particle is too close move it to the back
      if(particle.position.z < - this.ariaSize) {
        particle.position.z += (this.ariaSize * 2);
      }

    }
  }
}

export default ModelSpaceParticles
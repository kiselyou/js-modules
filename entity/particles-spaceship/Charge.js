import Particle from './../Particle'

class Charge extends Particle {
  constructor() {
    super()

    /**
     *
     * @type {number}
     */
    this.speed = 300

    /**
     *
     * @type {number}
     */
    this.maxDistance = 3000
  }
}

export default Charge
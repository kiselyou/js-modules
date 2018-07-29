import Particle from './Particle'

class ModelParticle extends Particle {
  constructor() {
    super()

    /**
     *
     * @type {number}
     */
    this.mass = 0

    /**
     * The value from 0 to 0.99
     *
     * @type {number}
     */
    this.coefficientReduceDomage = 0.5

    /**
     * The value from 1 to n
     *
     * @type {number}
     */
    this.coefficientIncraceDomage = 2
  }

  /**
   *
   * @param {number} value
   * @returns {ModelParticle}
   */
  setMass(value) {
    this.mass = value
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {ModelParticle}
   */
  setCoefficientReduceDomage(value) {
    this.coefficientReduceDomage = value
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {ModelParticle}
   */
  setCoefficientIncraceDomage(value) {
    this.coefficientIncraceDomage = value
    return this
  }
}

export default ModelParticle
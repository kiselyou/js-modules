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
     *
     * @type {number}
     */
    this.coefficientReduceDomage = 0.5

    /**
     *
     * @type {number}
     */
    this.coefficientIncraceDomage = 0.5
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
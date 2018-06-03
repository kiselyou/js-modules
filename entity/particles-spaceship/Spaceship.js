import Slot from './Slot'
import Particle from './../Particle'

class Spaceship extends Particle {
  constructor() {
    super()

    /**
     *
     * @type {Array.<Slot>}
     */
    this.slot = []

    /**
     *
     * @type {string|?}
     */
    this.modelKey = null
  }

  getParticlesBySlotType(type) {
    const particles = []
    for (const slot of this.slot) {
      if (slot.type === type) {
        particles.push(slot.particle)
      }
    }
    return particles
  }

  /**
   *
   * @param {string} value
   * @returns {Spaceship}
   */
  setModelKey(value) {
    this.modelKey = value
    return this
  }

  /**
   *
   * @param {Slot} value
   * @returns {Spaceship}
   */
  addSlot(value) {
    this.slot.push(value)
    return this
  }

  /**
   *
   * @param {Object} data
   * @param {Array} [except]
   * @returns {Spaceship}
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
          case 'slot':
            for (const slotData of data[property]) {
              this.slot.push(new Slot().copy(slotData, ['id']))
            }
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

export default Spaceship
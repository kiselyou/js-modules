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
              this.slot.push(new Slot().copy(slotData))
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

  /**
   *
   * @param {string} slotId
   * @returns {Slot|?}
   */
  getSlotById(slotId) {
    for (const slot of this.slot) {
      if (slot.id === slotId) {
        return slot
      }
    }
    return null
  }

  /**
   *
   * @param {number} type
   * @returns {Slot|?}
   */
  getSlotByType(type) {
    for (const slot of this.slot) {
      if (slot.type === type) {
        return slot
      }
    }
    return null
  }

  /**
   * @param {number} type
   * @returns {Array.<Slot>}
   */
  getSlotsByType(type) {
    const slots = []
    for (const slot of this.slot) {
      if (slot.type === type) {
        slots.push(slot)
      }
    }
    return slots
  }

  /**
   *
   * @param {number} type - This is "Slot" constants
   * @returns {Array}
   */
  getParticlesByType(type) {
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
   * @param {number} type - This is "Slot" constants
   * @returns {Particle|?}
   */
  getParticleByType(type) {
    const slot = this.getSlotByType(type)
    return slot ? slot.particle : null
  }

  /**
   *
   * @returns {Engine|?}
   */
  getEngine() {
    return this.getParticleByType(Slot.TYPE_ENGINE)
  }

  /**
   *
   * @returns {Armor|?}
   */
  getArmor() {
    return this.getParticleByType(Slot.TYPE_ARMOR)
  }

  /**
   *
   * @returns {Shell|?}
   */
  getShell() {
    return this.getParticleByType(Slot.TYPE_SHELL)
  }

  /**
   *
   * @param {string} id
   * @returns {Shell|?}
   */
  getGunBySlotId(id) {
    const slots = this.getSlot(id)
    return slots ? slots.particle : null
  }

  /**
   *
   * @returns {Array.<Gun>}
   */
  getGuns() {
    return this.getParticlesByType(Slot.TYPE_GUN)
  }
}

export default Spaceship
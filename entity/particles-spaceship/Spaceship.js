import Slot from './Slot'
import Shell from './Shell'
import EnergyGroup from './EnergyGroup'
import ModelParticle from './../ModelParticle'

class Spaceship extends ModelParticle {
  constructor() {
    super()

    /**
     *
     * @type {Array.<Slot>}
     */
    this.slot = []

    /**
     *
     * @type {EnergyGroup}
     */
    this.energyGroup = new EnergyGroup()

    /**
     *
     * @type {Shell}
     */
    this.shell = new Shell()
  }

  /**
   * @returns {void}
   */
  async beforeStart() {
    this.setCategoryName('Spaceship')
    this.updateEnergy().updateShell()
  }

  /**
   *
   * @returns {Spaceship}
   */
  updateEnergy() {
    const slots = this.getSlotsByType(Slot.TYPE_ENERGY)

    // console.log(this.id)
    //
    // console.log('Spaceship -> updateEnergy', this.energyGroup, slots, '========')

    for (const slot of slots) {
      this.energyGroup.addEnergy(slot.particle)
    }
    this.energyGroup.updateEnergy()
    return this
  }

  /**
   *
   * @returns {Spaceship}
   */
  updateShell() {
    const shell = this.getParticleByType(Slot.TYPE_SHELL)
    this.shell.copy(shell)
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
          case 'energyGroup':
            this[property].copy(data[property])
            break
          case 'shell':
            this[property].copy(data[property])
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
   * @returns {Shell}
   */
  getShell() {
    return this.shell
  }

  /**
   *
   * @returns {Engine|?}
   */
  getGuns() {
    return this.getParticlesByType(Slot.TYPE_GUN)
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
  getShipEnergy() {
    return this.energyGroup.shipEnergy
  }

  /**
   *
   * @returns {Particle|?}
   */
  getGunEnergy() {
    return this.energyGroup.gunEnergy
  }

  /**
   *
   * @returns {EnergyGroup}
   */
  getGroupEnergy() {
    return this.energyGroup
  }

  /**
   *
   * @param {Number} delta
   * @param {Function} [onChangeCallback]
   * @returns {void}
   */
  rechargeGuns(delta, onChangeCallback) {
    const guns = this.getParticlesByType(Slot.TYPE_GUN)
    for (const gun of guns) {
      gun.restoreTimerState(delta, onChangeCallback)
    }
  }

  /**
   *
   * @param {Number} delta
   * @param {Function} [onChangeCallback]
   * @returns {void}
   */
  restoreEnergy(delta, onChangeCallback) {
    this.energyGroup.restoreEnergy(delta, onChangeCallback)
  }

  /**
   *
   * @param {Number} delta
   * @param {Function} [onChangeCallback]
   * @returns {void}
   */
  restoreShell(delta, onChangeCallback) {
    this.shell.restore(delta, onChangeCallback)
  }
}

export default Spaceship
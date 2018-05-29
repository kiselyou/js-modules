import Slot from './Slot'
import Particle from './Particle'

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
     * @type {null}
     */
    this.modelKey = null
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
   * @param {object} data
   * @returns {Spaceship}
   */
  copy(data) {
    for (const property in data) {
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
}

export default Spaceship
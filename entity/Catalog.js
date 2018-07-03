import Spaceship from './particles-spaceship/Spaceship'
import Engine from './particles-spaceship/Engine'
import Energy from './particles-spaceship/Energy'
import Armor from './particles-spaceship/Armor'
import Shell from './particles-spaceship/Shell'
import Gun from './particles-spaceship/Gun'

class Catalog {
  constructor() {
    /**
     *
     * @type {boolean}
     */
    this.isLoaded =false

    /**
     *
     * @type {Array.<Particle>}
     */
    this.items = []
  }

  /**
   *
   * @returns {Catalog}
   */
  final() {
    this.isLoaded = true
    return this
  }

  /**
   *
   * @param {Particle|Object} value
   * @returns {Catalog}
   */
  addItem(value) {
    this.items.push(value)
    return this
  }

  /**
   *
   * @param {Array.<Particle|Object>} items
   * @returns {Catalog}
   */
  copy(items) {
    this.items = this.items.concat(items)
    return this
  }

  /**
   *
   * @param {string} id
   * @returns {Spaceship|null}
   */
  getSpaceshipById(id) {
    const value = this.findEntityById('Spaceship', id)
    return value ? new Spaceship().copy(value) : null
  }

  /**
   *
   * @param {string} id
   * @returns {Engine|null}
   */
  getEngineById(id) {
    const value = this.findEntityById('Engine', id)
    return value ? new Engine().copy(value) : null
  }

  /**
   *
   * @param {string} id
   * @returns {Energy|null}
   */
  getEnergyById(id) {
    const value = this.findEntityById('Energy', id)
    return value ? new Energy().copy(value) : null
  }

  /**
   *
   * @param {string} id
   * @returns {Engine|null}
   */
  getShellById(id) {
    const value = this.findEntityById('Shell', id)
    return value ? new Shell().copy(value) : null
  }

  /**
   *
   * @param {string} id
   * @returns {Engine|null}
   */
  getArmorById(id) {
    const value = this.findEntityById('Armor', id)
    return value ? new Armor().copy(value) : null
  }

  /**
   *
   * @param {string} id
   * @returns {Gun|null}
   */
  getGunById(id) {
    const value = this.findEntityById('Gun', id)
    return value ? new Gun().copy(value) : null
  }

  /**
   *
   * @param {string} entityName
   * @param {string} id
   * @returns {Particle|?}
   */
  findEntityById(entityName, id) {
    const value = this.items.find((item) => {
      return item.entity === entityName && item.id === id
    })
    return value || null
  }

  /**
   *
   * @param {string} id
   * @returns {Particle|?}
   */
  findById(id) {
    const value = this.items.find((item) => {
      return item.id === id
    })
    return value || null
  }

  /**
   *
   * @param {string} entity
   * @returns {Particle|?}
   */
  findByEntityName(entity) {
    const value = this.items.find((item) => {
      return item.entity === entity
    })
    return value || null
  }
}

export default Catalog
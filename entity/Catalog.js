import Spaceship from './particles-spaceship/Spaceship'
import Engine from './particles-spaceship/Engine'
import Gun from './particles-spaceship/Gun'

class Catalog {
  constructor() {
    this.items = []
  }

  /**
   *
   * @param {Object} value
   * @returns {Catalog}
   */
  addItem(value) {
    this.items.push(value)
    return this
  }

  /**
   *
   * @param {Array} items
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
  getSpaceShipById(id) {
    const value = this.findEntityById('Spaceship', id)
    return value ? new Spaceship().copy(value, ['id']) : null
  }

  /**
   *
   * @param {string} id
   * @returns {Engine|null}
   */
  getEngineById(id) {
    const value = this.findEntityById('Engine', id)
    return value ? new Engine().copy(value, ['id']) : null
  }

  /**
   *
   * @param {string} id
   * @returns {Gun|null}
   */
  getGunById(id) {
    const value = this.findEntityById('Gun', id)
    return value ? new Gun().copy(value, ['id']) : null
  }

  /**
   *
   * @param {string} entityName
   * @param {string} id
   * @returns {T | null}
   */
  findEntityById(entityName, id) {
    const value = this.items.find((item) => {
      return item.entity === entityName && item.id === id
    })
    return value || null
  }
}

export default Catalog
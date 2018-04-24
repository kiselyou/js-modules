import uuidV4 from 'uuid/v4'
import { Vector3 }  from 'three'

class Sector {
  constructor() {
    /**
     * @type {string}
     */
    this.entity = this.constructor.name

    /**
     * @type {string}
     */
    this.id = uuidV4()

    /**
     *
     * @type {string}
     */
    this.name = null

    /**
     *
     * @type {Vector3}
     */
    this.size = new Vector3(1000, 1000)

    /**
     *
     * @type {Vector3}
     */
    this.position = new Vector3()

    /**
     *
     * @type {number}
     */
    this.starKey = 1
  }

  /**
   *
   * @param {number} key
   * @returns {Sector}
   */
  setStarKey(key) {
    this.starKey = key
    return this
  }

  /**
   *
   * @param {string} id
   * @returns {Sector}
   */
  setId(id) {
    this.id = id
    return this
  }

  /**
   *
   * @param {string} name
   * @returns {Sector}
   */
  setName(name) {
    this.name = name
    return this
  }

  /**
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {Sector}
   */
  setSize(x, y, z) {
    this.size.set(x, y, z)
    return this
  }

  /**
   *
   * @param {number} x
   * @param {number} y
   * @param {number} y
   * @returns {Sector}
   */
  setPosition(x, y, z) {
    this.position.set(x, y, z)
    return this
  }

  /**
   *
   * @param {object} data
   * @returns {Sector}
   */
  copy(data) {
    for (const property in data) {
      if (data.hasOwnProperty(property)) {
        switch (property) {
          case 'entity':
            break
          case 'size':
          case 'position':
            this[property].copy(data[property])
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

export default Sector
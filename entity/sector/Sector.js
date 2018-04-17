import uuidV4 from 'uuid/v4'
import { Vector2 }  from 'three'

class Sector {
  constructor() {
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
     * @type {Vector2}
     */
    this.size = new Vector2(1000, 1000)

    /**
     *
     * @type {Vector2}
     */
    this.position = new Vector2()

    /**
     *
     * @type {Array.<(Player|Planet|Station)>}
     */
    this.particles = []
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
   * @returns {Sector}
   */
  setSize(x, y) {
    this.size.set(x, y)
    return this
  }

  /**
   *
   * @param {number} x
   * @param {number} y
   * @returns {Sector}
   */
  setPosition(x, y) {
    this.position.set(x, y)
    return this
  }

  /**
   *
   * @param {Sector}
   * @returns {(Player|Planet|Station)}
   * @callback particlePackage
   */

  /**
   *
   * @param {particlePackage} particlePackage
   * @returns {Sector}
   */
  addParticle(particlePackage) {
    this.particles.push(particlePackage(this))
    return this
  }
}

export default Sector
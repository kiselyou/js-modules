import uuidV4 from 'uuid/v4'
import { randFloat } from './../../module/helper/Helper'
import { Vector3 } from 'three'


const min = 2000
const range = 6000

/**
 *
 * @type {Vector3}
 */
const center = new Vector3()

class Star {
  constructor() {
    /**
     * @type {string}
     */
    this.id = uuidV4()

    /**
     *
     * @type {Vector3}
     */
    this.position = new Vector3()

    /**
     * @type {number}
     */
    this.key = 1
  }

  /**
   *
   * @param {number} key
   * @returns {Star}
   */
  setKey(key) {
    this.key = key
    return this
  }

  /**
   *
   * @returns {Star}
   */
  updatePosition() {
    this._prepare()
    return this
  }

  /**
   *
   * @returns {number}
   * @private
   */
  _prepare() {
    const len = range / 2
    this.position.setX(randFloat(- len, len))
    this.position.setY(randFloat(- len, len))
    this.position.setZ(randFloat(- len, len))
    const distance = center.distanceTo(this.position)
    if (distance < min) {
      this._prepare()
    }
  }
}

export default Star
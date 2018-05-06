import uuidV4 from 'uuid/v4'
import { randFloat } from './../../module/helper/Helper'
import { Vector3 } from 'three'

const min = 2000
const max = 3000

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
  updatePosition(rangeX, rangeY, rangeZ) {
    this._prepare(rangeX, rangeY, rangeZ)
    return this
  }

  /**
   *
   * @returns {number}
   * @private
   */
  _prepare(rangeX, rangeY, rangeZ) {
    let len = rangeX / 2
    this.position.setX(randFloat(- len, len))
    len = rangeY / 2
    this.position.setY(randFloat(- len, len))
    len = rangeZ / 2
    this.position.setZ(randFloat(- len, len))
    const distance = center.distanceTo(this.position)
    if (distance < min) {
      this._prepare(rangeX + rangeX / 10, rangeY + rangeY / 10, rangeZ + rangeZ / 10)
      return
    }

    if (distance > max) {
      this._prepare(rangeX - rangeX / 10, rangeY - rangeY / 10, rangeZ - rangeZ / 10)
    }
  }
}

export default Star
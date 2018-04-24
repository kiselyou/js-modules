import uuidV4 from 'uuid/v4'
import { randFloat } from './../../module/helper/Helper'
import { Vector3 } from 'three'

let min = 200
let max = 800

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
    this.position = new Vector3(this._p, this._p, this._p)
    return this
  }

  /**
   *
   * @returns {number}
   * @private
   */
  get _p() {
    // return randFloat(- max, max)
    let p = randFloat(- max, max)
    if (p >= min) {
      return p
    } else if (p <= -min) {
      return p
    } else {
      return this._p
    }
  }
}

export default Star
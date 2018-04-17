import uuidV4 from 'uuid/v4'
import { Vector2 } from 'three'

class Station {
  constructor() {
    /**
     * @type {string}
     */
    this.id = uuidV4()

    /**
     *
     * @type {string}
     */
    this.sectorId = null

    /**
     *
     * @type {Vector2}
     */
    this.position = new Vector2()

    /**
     *
     * @type {string}
     */
    this.babkAccountId = null
  }
}

export default Station
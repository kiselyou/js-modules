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
  }
}

export default Sector
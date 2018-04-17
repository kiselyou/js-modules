import uuidV4 from 'uuid/v4'
import { Vector2 }  from 'three'

class Planet {
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
     * @type {number}
     */
    this.population = 0

    /**
     *
     * @type {number}
     */
    this.size = 1000

    /**
     *
     * @type {string}
     */
    this.raceId = null

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
    this.monitorId = null

    /**
     *
     * @type {string}
     */
    this.bankAccountId = null
  }
}

export default Planet
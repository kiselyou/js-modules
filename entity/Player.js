import uuidV4 from 'uuid/v4'

class Player {
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
     * @type {string}
     */
    this.raceId = null
  }
}

export default Player
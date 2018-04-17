import uuidV4 from 'uuid/v4'

class PlayerHasStation {
  constructor() {
    /**
     * @type {string}
     */
    this.id = uuidV4()

    /**
     *
     * @type {string}
     */
    this.playerId = null

    /**
     *
     * @type {string}
     */
    this.stationId = null
  }
}

export default PlayerHasStation
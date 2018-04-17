import uuidV4 from 'uuid/v4'

class SectorHasPlayer {
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
     * @type {string}
     */
    this.playerId = null
  }
}

export default SectorHasPlayer
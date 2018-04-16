import uuidV4 from 'uuid/v4'

class RaceHasRelation {
  constructor() {
    /**
     * @type {string}
     */
    this.id = uuidV4()

    /**
     *
     * @type {string}
     */
    this.raceId = null

    /**
     *
     * @type {string}
     */
    this.withRaceId = null

    /**
     *
     * @type {number}
     */
    this.statusId = null
  }
}

export default RaceHasRelation
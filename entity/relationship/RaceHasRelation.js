import uuidV4 from 'uuid/v4'

/**
 * Отношение между расами
 */
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
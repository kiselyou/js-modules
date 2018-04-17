import uuidV4 from 'uuid/v4'

class Race {
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
    this.monitorId = null
  }
}

export default Race
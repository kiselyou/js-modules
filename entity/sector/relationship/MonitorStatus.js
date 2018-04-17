import uuidV4 from 'uuid/v4'

class MonitorStatus {
  constructor() {
    /**
     * @type {string}
     */
    this.id = uuidV4()

    /**
     *
     * @type {string}
     */
    this.monitorId = null

    /**
     *
     * @type {string}
     */
    this.withMonitorId = null

    /**
     *
     * @type {string}
     */
    this.statusId = null
  }
}

export default MonitorStatus
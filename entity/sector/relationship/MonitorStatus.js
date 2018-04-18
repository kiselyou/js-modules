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

  /**
   *
   * @param {string} monitorId
   * @param {string} withMonitorId
   * @param {string} statusId
   * @returns {MonitorStatus}
   */
  setStatus(monitorId, withMonitorId, statusId) {
    this.monitorId = monitorId
    this.withMonitorId = withMonitorId
    this.statusId = statusId
    return this
  }
}

export default MonitorStatus
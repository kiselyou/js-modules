import uuidV4 from 'uuid/v4'

class MonitorStatus {
  constructor() {
    /**
     * @type {string}
     */
    this.entity = this.constructor.name

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
    this.statusId = null
  }

  /**
   *
   * @param {string} monitorId
   * @param {string} statusId
   * @returns {MonitorStatus}
   */
  setStatus(monitorId, statusId) {
    this.monitorId = monitorId
    this.statusId = statusId
    return this
  }
}

export default MonitorStatus
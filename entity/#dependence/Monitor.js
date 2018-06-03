import uuidV4 from 'uuid/v4'
import MonitorStatus from './MonitorStatus'

/**
 * Создается для каждой записи Planet, Race, Player
 */
class Monitor {
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
     * @type {Array.<MonitorStatus>}
     */
    this.monitorStatus = []
  }

  addStatus(withMonitorId, statusId) {
    this.monitorStatus.push(
      new MonitorStatus()
        .setStatus(withMonitorId, statusId)
    )
  }

  /**
   *
   * @param {object} data
   * @returns {Monitor}
   */
  copy(data) {
    for (const property in data) {
      if (data.hasOwnProperty(property)) {
        switch (property) {
          case 'entity':
            break
          case 'playerHasStation':
            for (const item of data[property]) {
              this.monitorStatus.push(
                new MonitorStatus()
                  .copy(item)
              )
            }
            break
          default:
            this[property] = data[property]
            break
        }
      }
    }
    return this
  }
}

export default Monitor
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
    this.className = this.constructor.name

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
}

export default Monitor

class EventControls {
  constructor() {
    /**
     *
     * @type {Object}
     */
    this.events = {}
  }

  /**
   *
   * @param {string} eventName
   * @param {Function} callback
   * @returns {void}
   */
  ifActive(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = false
      callback()
    }
  }

  /**
   *
   * @param {string} eventName
   * @param {Function} callback
   * @returns {void}
   */
  ifNotActive(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = true
      callback()
    }
  }
}

export default EventControls
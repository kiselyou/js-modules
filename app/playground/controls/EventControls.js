
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
   * @returns {EventControls}
   */
  once(eventName, callback) {
    if ( ! this.events[eventName]) {
      this.events[eventName] = true
      callback()
    }
    return this
  }

  /**
   *
   * @param {string} eventName
   * @param {Function} callback
   * @returns {EventControls}
   */
  resetOnce(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = false
      callback()
    }
    return this
  }
}

export default EventControls

class SpaceTimer {
  constructor() {
    /**
     * Миллисекунд в минуте
     *
     * @type {number}
     */
    this.ms = 100

    /**
     * Количество секунд с момента появления галактики
     *
     * @type {number}
     */
    this.timestamp = 0

    /**
     *
     * @type {string|?}
     * @private
     */
    this._timerId = null

    /**
     *
     * @type {{second: Array.<timerEvent>, minute: Array.<timerEvent>, hour: Array.<timerEvent>, day: Array.<timerEvent>, year: Array.<timerEvent>}}
     * @private
     */
    this._events = {second: [], minute: [], hour: [], day: [], year: []}
  }

  /**
   *
   * @param {number} value
   * @returns {SpaceTimer}
   */
  setTimestamp(value) {
    this.timestamp = value
    return this
  }

  /**
   * @param {{eventName: string, timestamp: number}} eventData
   * @callback timerEvent
   */

  /**
   *
   * @param {timerEvent} event
   * @returns {SpaceTimer}
   */
  eachSecond(event) {
    this._events.second.push(event)
    return this
  }

  /**
   *
   * @param {timerEvent} callback
   * @returns {SpaceTimer}
   */
  removeCallbackSecond(callback) {
    this.removeCallback('second', callback)
    return this
  }

  /**
   *
   * @param {timerEvent} callback
   * @returns {SpaceTimer}
   */
  eachMinute(callback) {
    this._events.minute.push(callback)
    return this
  }

  /**
   *
   * @param {timerEvent} callback
   * @returns {SpaceTimer}
   */
  removeCallbackMinute(callback) {
    this.removeCallback('minute', callback)
    return this
  }

  /**
   *
   * @param {timerEvent} event
   * @returns {SpaceTimer}
   */
  eachHour(event) {
    this._events.hour.push(event)
    return this
  }

  /**
   *
   * @param {timerEvent} callback
   * @returns {SpaceTimer}
   */
  removeCallbackHour(callback) {
    this.removeCallback('hour', callback)
    return this
  }

  /**
   *
   * @param {timerEvent} event
   * @returns {SpaceTimer}
   */
  eachDay(event) {
    this._events.day.push(event)
    return this
  }

  /**
   *
   * @param {timerEvent} callback
   * @returns {SpaceTimer}
   */
  removeCallbackDay(callback) {
    this.removeCallback('day', callback)
    return this
  }

  /**
   *
   * @param {timerEvent} event
   * @returns {SpaceTimer}
   */
  eachYear(event) {
    this._events.year.push(event)
    return this
  }

  /**
   *
   * @param {timerEvent} callback
   * @returns {SpaceTimer}
   */
  removeCallbackYear(callback) {
    this.removeCallback('year', callback)
    return this
  }

  /**
   *
   * @param {string} eventName
   * @private
   */
  _callEvents(eventName) {
    for (const event of this._events[eventName]) {
      event({eventName, timestamp: this.timestamp})
    }
  }

  /**
   *
   * @param {string} eventName
   * @param {timerEvent} callback
   * @returns {SpaceTimer}
   */
  removeCallback(eventName, callback) {
    const callbacks = this._events[eventName]
    for (let i = 0; i < callbacks.length; i++) {
      if (callbacks[i] === callback) {
        callbacks.splice(i, 1)
        break
      }
    }
    return this
  }

  /**
   *
   * @returns {SpaceTimer}
   */
  startTimer() {
    this.stopTimer()
    this._timerId = setInterval(() => {
      this.timestamp++
      this._callEvents('second')
      if ((this.timestamp % 60) === 0) {
        this._callEvents('minute')
      }

      if ((this.timestamp % (60 * 60)) === 0) {
        this._callEvents('hour')
      }

      if ((this.timestamp % (60 * 60 * 24)) === 0) {
        this._callEvents('day')
      }

      if ((this.timestamp % (60 * 60 * 24 * 365)) === 0) {
        this._callEvents('year')
      }
    }, this.ms)
    return this
  }

  /**
   * Stop timer
   *
   * @returns {SpaceTimer}
   */
  stopTimer() {
    clearInterval(this._timerId)
    this._timerId = null
    return this
  }
}

export default SpaceTimer
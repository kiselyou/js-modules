
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
   * @param {timerEvent} event
   * @returns {SpaceTimer}
   */
  eachMinute(event) {
    this._events.minute.push(event)
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
   * @param {timerEvent} event
   * @returns {SpaceTimer}
   */
  eachDay(event) {
    this._events.day.push(event)
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
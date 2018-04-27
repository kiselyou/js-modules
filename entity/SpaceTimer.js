let second = 0, minute = 0, hour = 0, day = 0, year = 0

class SpaceTimer {
  constructor() {
    /**
     * Миллисекунд в минуте
     *
     * @type {number}
     */
    this.ms = 500

    /**
     * Одна космическая секунда это 500 милисекунд
     *
     * @type {number}
     */
    this.oneSecond = 1

    /**
     * Длительность космической минуты в секундах
     *
     * @type {number}
     */
    this.oneMinute = 12

    /**
     * Длительность космического часа в секундах
     *
     * @type {number}
     */
    this.oneHour = 12 * 12

    /**
     * Длительность космического дня в секундах
     *
     * @type {number}
     */
    this.oneDay = 24 * 12 * 12

    /**
     * Длительность космического года в секундах
     *
     * @type {number}
     */
    this.oneYear = 365 * 24 * 12 * 12

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
     * @type {{second: Array.<timerEvent>, minute: Array.<timerEvent>, day: Array.<timerEvent>, year: Array.<timerEvent>}}
     * @private
     */
    this._events = {second: [], minute: [], day: [], year: []}
  }

  /**
   * @param {string} eventName  Possible values (second|minute|day)
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
    console.log(eventName, this.timestamp)
    // for (const event of this._events[eventName]) {
    //   event(eventName)
    // }
  }

  /**
   *
   * @returns {SpaceTimer}
   */
  startTimer() {
    this.stopTimer()
    this._timerId = setInterval(() => {
      this.timestamp += this.oneSecond
      this._callEvents('seconds')

      minute += this.oneSecond
      if (minute === this.oneMinute) {
        minute = 0
        this._callEvents('minute')
      }

      hour += this.oneSecond
      if (hour === this.oneHour) {
        hour = 0
        this._callEvents('hour')
      }

      day += this.oneSecond
      if (day === this.oneDay) {
        day = 0
        this._callEvents('day')
      }

      year += this.oneSecond
      if (year === this.oneYear) {
        year = 0
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
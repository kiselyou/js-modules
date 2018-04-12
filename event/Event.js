/**
 *
 * @type {Object.<Array>}
 * @private
 */
let events = []

class Event {
    /**
     * @param {*} [options]
     * @callback eventListener
     */

    /**
     * Remove event and all listeners
     * Remove only specific listener in the specific event
     *
     * @param {string} eventName
     * @param {eventListener} [listener]
     * @returns {void}
     */
    static remove(eventName, listener) {
        if (!listener) {
            delete(events[eventName])
        } else {
            events[eventName] = events[eventName].filter(event => event !== listener)
        }
    }

    /**
     * Calls listeners by specific event
     *
     * @param {string} eventName
     * @param {*} [options]
     * @returns {void}
     */
    static run(eventName, options) {
        const listeners = this.get(eventName)
        for (let listener of listeners) {
            listener(options)
        }
    }

    /**
     * Gets all listeners for a specific event
     *
     * @param {string} eventName
     * @returns {Array}
     */
    static get(eventName) {
        return events[eventName] ? events[eventName] : []
    }

    /**
     * Registration a new event.
     *
     * @param {string} eventName
     * @param {eventListener} listener
     * @returns {void}
     */
    static add(eventName, listener) {
        if (!events.hasOwnProperty(eventName)) {
            events[eventName] = []
        }
        events[eventName].push(listener)
    }
}

export default Event
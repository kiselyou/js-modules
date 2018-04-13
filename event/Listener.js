/**
 *
 * @type {Object.<Array>}
 * @private
 */
let events = []

class Listener {
    /**
     * @param {*} [options]
     * @callback eventAction
     */

    /**
     * Remove event fully
     * Remove callback function for specific event
     *
     * @param {string} eventName
     * @param {eventAction} [callback]
     * @returns {void}
     */
    static remove(eventName, callback) {
        if (!callback) {
            delete(events[eventName])
        } else {
            events[eventName] = events[eventName].filter(event => event !== callback)
        }
    }

    /**
     * Calls callback functions for specific event
     *
     * @param {string} eventName
     * @param {*} [options]
     * @returns {void}
     */
    static emit(eventName, options) {
        const callbacks = this.get(eventName)
        for (let callback of callbacks) {
            callback(options)
        }
    }

    /**
     * Gets all callback functions for specific event
     *
     * @param {string} eventName
     * @returns {Array.<eventAction>}
     */
    static get(eventName) {
        return events[eventName] ? events[eventName] : []
    }

    /**
     * Registration new event and callback functions
     * or add callback functions to existing event
     *
     * @param {string} eventName
     * @param {eventAction} callback
     * @returns {void}
     */
    static on(eventName, callback) {
        if (!events.hasOwnProperty(eventName)) {
            events[eventName] = []
        }
        if (events[eventName].indexOf(callback) === -1) {
            events[eventName].push(callback)
        }
    }
}

export default Listener
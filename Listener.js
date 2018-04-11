
let instance;
let isStatic = false;

class Listener {
    constructor() {
        if (!isStatic) {
            throw Error('This is a static class. Try to call "Listener.init()"');
        }

        /**
         *
         * @type {Object.<Array>}
         * @private
         */
        this._events = {}
    }

    /**
     *
     * @returns {Listener}
     */
    static init() {
        isStatic = true
        return instance = (instance ? instance : new Listener())
    }

    /**
     *
     * @param {string} eventName
     * @param {Function} listener
     * @returns {Listener}
     */
    destroy(eventName, listener) {
        if (!listener) {
            delete(this._events[eventName])
        } else {
            this._events[eventName] = this._events[eventName].filter(event => event.listener !== listener)
        }
        return this
    }

    /**
     * Calls specific event
     *
     * @param {string} eventName
     * @param {*} [options]
     * @returns {Listener}
     */
    call(eventName, options) {
        const listeners = this.get(eventName)
        for (let listener of listeners) {
            listener(options)
        }
        return this;
    }

    /**
     * Gets all functions for specific event
     *
     * @param {string} eventName
     * @returns {Array}
     */
    get(eventName) {
        return this._events[eventName] ? this._events[eventName] : [];
    }

    /**
     * Sets event.
     * If event has already exists this method will rewrite it
     *
     * @param {string} eventName
     * @param {Function} listener
     * @returns {Listener}
     */
    set(eventName, listener) {
        this._events[eventName] = [listener]
        return this
    }

    /**
     * Add event.
     * If event has already exists this method will add to existed
     *
     * @param {string} eventName
     * @param {Function} listener
     * @returns {Listener}
     */
    add(eventName, listener) {
        if (!this._events.hasOwnProperty(eventName)) {
            this._events[eventName] = []
        }
        this._events[eventName].push(listener)
        return this;
    }
}

export default Listener
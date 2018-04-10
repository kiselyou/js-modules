
let instance;
let isStatic = false;

class EventListener {
    constructor() {
        if (!isStatic) {
            throw Error('This is a static class. Try to call "EventListener.init()"');
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
     * @returns {EventListener}
     */
    static init() {
        isStatic = true
        return instance = (instance ? instance : new EventListener())
    }

    /**
     *
     * @param {string} eventName
     * @param {Function} listener
     * @returns {EventListener}
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
     * @returns {EventListener}
     */
    call(eventName) {
        const events = this.get(eventName)
        for (let item of events) {
            item.listener(item.params)
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
     * @param {*} [params]
     * @returns {EventListener}
     */
    set(eventName, listener, params) {
        this._events[eventName] = [this._getItem(listener, params)]
        return this
    }

    /**
     * Add event.
     * If event has already exists this method will add to existed
     *
     * @param {string} eventName
     * @param {Function} listener
     * @param {*} [params]
     * @returns {EventListener}
     */
    add(eventName, listener, params) {
        if (!this._events.hasOwnProperty(eventName)) {
            this._events[eventName] = []
        }
        this._events[eventName].push(this._getItem(listener, params))
        return this;
    }

    /**
     *
     * @param {Function} listener
     * @param {*} params
     * @returns {{listener: Function, params: *}}
     * @private
     */
    _getItem(listener, params) {
        return {listener: listener, params: params}
    }
}
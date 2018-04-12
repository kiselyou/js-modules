import { assert } from 'chai'
import { describe, it } from 'mocha'
import Event from '../../event/Event'

describe('Event.registrate', () => {
    const EVENT_TEST_START = 'EVENT_TEST_START'
    const EVENT_TEST_STOP = 'EVENT_TEST_STOP'
    let counter = 0

    const start = () => {
        counter++
    }

    const stop = () => {
        counter--
    }

    it('Added listener only one time', () => {
        Event.on(EVENT_TEST_START, start)
        Event.on(EVENT_TEST_START, start)
        Event.on(EVENT_TEST_STOP, stop)
        Event.on(EVENT_TEST_STOP, stop)
        assert.equal(Event.get(EVENT_TEST_START).length, 1)
        assert.equal(Event.get(EVENT_TEST_STOP).length, 1)
    })

    it('Run listener "start"', () => {
        Event.emit(EVENT_TEST_START)
        assert.equal(counter, 1)
    })

    it('Run listener "stop"', () => {
        Event.emit(EVENT_TEST_STOP)
        assert.equal(counter, 0)
    })

    it('Remove specific listener from events', () => {
        Event.remove(EVENT_TEST_START, start)
        Event.remove(EVENT_TEST_STOP, stop)
        assert.equal(Event.get(EVENT_TEST_START).length, 0)
    })

    it('Add few listener in the specific event', () => {
        Event.on(EVENT_TEST_START, start)
        Event.on(EVENT_TEST_START, stop)
        assert.equal(Event.get(EVENT_TEST_START).length, 2)
    })

    it('Run few listener in the specific event', () => {
        Event.emit(EVENT_TEST_START, start)
        assert.equal(counter, 0)
    })

    it('Remove event', () => {
        Event.remove(EVENT_TEST_START)
        assert.equal(Event.get(EVENT_TEST_START).length, 0)
    })
});
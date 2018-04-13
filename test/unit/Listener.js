import { assert } from 'chai'
import { describe, it } from 'mocha'
import Listener from '../../event/Listener'

describe('Listener.registrate', () => {
    const EVENT_TEST_START = 'EVENT_TEST_START'
    const EVENT_TEST_STOP = 'EVENT_TEST_STOP'
    const EVENT_TEST_JUMP = 'EVENT_TEST_JUMP'
    let counter = 0

    const start = () => {
        counter++
    }

    const stop = () => {
        counter--
    }

    it('Added listener only one time', () => {
        Listener.on(EVENT_TEST_START, start)
        Listener.on(EVENT_TEST_START, start)
        Listener.on(EVENT_TEST_STOP, stop)
        Listener.on(EVENT_TEST_STOP, stop)
        assert.equal(Listener.get(EVENT_TEST_START).length, 1)
        assert.equal(Listener.get(EVENT_TEST_STOP).length, 1)
    })

    it('Run listener "start"', () => {
        Listener.emit(EVENT_TEST_START)
        assert.equal(counter, 1)
    })

    it('Run listener "stop"', () => {
        Listener.emit(EVENT_TEST_STOP)
        assert.equal(counter, 0)
    })

    it('Remove specific listener from events', () => {
        Listener.remove(EVENT_TEST_START, start)
        Listener.remove(EVENT_TEST_STOP, stop)
        assert.equal(Listener.get(EVENT_TEST_START).length, 0)
    })

    it('Add few listener in the specific event', () => {
        Listener.on(EVENT_TEST_START, start)
        Listener.on(EVENT_TEST_START, stop)
        assert.equal(Listener.get(EVENT_TEST_START).length, 2)
    })

    it('Run few listener in the specific event', () => {
        Listener.emit(EVENT_TEST_START)
        assert.equal(counter, 0)
    })

    it('Remove event', () => {
        Listener.remove(EVENT_TEST_START)
        assert.equal(Listener.get(EVENT_TEST_START).length, 0)
    })

    it('Give parameters to listener', () => {
        Listener.on(EVENT_TEST_JUMP, (options) => {
            assert.deepEqual({r: 10, g: 100, b: 255}, options)
        })
        Listener.emit(EVENT_TEST_JUMP, {r: 10, g: 100, b: 255})
    })
});
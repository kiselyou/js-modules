// import assert from 'assert'
import { assert } from 'chai'
import { describe, it } from 'mocha'
import Listener from './../Listener'

describe('Listener.init()', () => {
    const EVENT_TEST_1 = 'EVENT_TEST_1'
    const EVENT_TEST_2 = 'EVENT_TEST_2'
    let counter = 0

    const start = () => {
        counter++
    }

    const run = () => {
        counter++
    }

    const stop = () => {
        counter++
    }

    const jump = () => {
        counter++
    }

    Listener.init().add(EVENT_TEST_1, jump)
    Listener.init().set(EVENT_TEST_2, start)
    Listener.init().add(EVENT_TEST_2, run)
    Listener.init().add(EVENT_TEST_2, stop)

    it('Call function "jump"', () => {
        counter = 0 //clear counter
        Listener.init().call(EVENT_TEST_1, jump)
        assert.equal(counter, 1)
    })

    it('Destroy function "jump"', () => {
        Listener.init().destroy(EVENT_TEST_1, jump)
        const countListeners = Listener.init().get(EVENT_TEST_1).length;
        assert.equal(countListeners, 0)
    })

    it('Call functions "start", "run", "stop"', () => {
        counter = 0 //clear counter
        Listener.init().call(EVENT_TEST_2)
        assert.equal(counter, 3)
    })

    it('Destroy all functions for event "EVENT_TEST_2"', () => {
        Listener.init().destroy(EVENT_TEST_2)
        const countListeners = Listener.init().get(EVENT_TEST_2).length;
        assert.equal(countListeners, 0)
    })
});
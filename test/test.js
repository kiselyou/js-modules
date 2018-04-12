import { assert } from 'chai'
import { describe, it } from 'mocha'
import Event from './../Event'

describe('Event.registrate', () => {
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

    Event.add(EVENT_TEST_1, jump)
    Event.add(EVENT_TEST_2, start)
    Event.add(EVENT_TEST_2, run)
    Event.add(EVENT_TEST_2, stop)

    it('Call function "jump"', () => {
        counter = 0 //clear counter
        Event.run(EVENT_TEST_1, jump)
        assert.equal(counter, 1)
    })

    it('Destroy function "jump"', () => {
        Event.remove(EVENT_TEST_1, jump)
        const countListeners = Event.get(EVENT_TEST_1).length
        assert.equal(countListeners, 0)
    })

    it('Call functions "start", "run", "stop"', () => {
        counter = 0 //clear counter
        Event.run(EVENT_TEST_2)
        assert.equal(counter, 3)
    })

    it('Destroy all functions for event "EVENT_TEST_2"', () => {
        Event.remove(EVENT_TEST_2)
        const countListeners = Event.get(EVENT_TEST_2).length
        assert.equal(countListeners, 0)
    })
});
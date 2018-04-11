import assert from 'assert'
import { describe, it } from 'mocha'
import Listener from './../Listener'

describe('Listener', () => {
    it('Listener should call three functions and remove one of them through 1500ms', () => {
        const EVENT_TEST_1 = 'EVENT_TEST_1'
        let counter = 0

        const testFunctionStart = () => {
            counter++
        }

        const testFunctionContinue = () => {
            counter++
        }

        const testFunctionDestroy = () => {
            counter++
        }

        const testFunctionStop = () => {
            counter++
            assert.equal(counter, 3);
        }

        Listener.init().set(EVENT_TEST_1, testFunctionStart)
        Listener.init().add(EVENT_TEST_1, testFunctionContinue)
        Listener.init().add(EVENT_TEST_1, testFunctionDestroy)
        Listener.init().add(EVENT_TEST_1, testFunctionStop)

        setTimeout(() => {
            Listener.init().destroy(EVENT_TEST_1, testFunctionDestroy)
            Listener.init().call(EVENT_TEST_1)
        }, 1500)
    });
});
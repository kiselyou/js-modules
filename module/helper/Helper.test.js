import { assert, expect } from 'chai'
import { describe, it } from 'mocha'
import { randInt, randFloat } from './Helper'

describe('helper', () => {

  it('Generate random integer', () => {
    for (let max = -1000; max < 1000; max++) {
      let min = max - 1000
      const value = randInt(min, max)
      expect(value, `randInt(${min}, ${max}) gave value - ${value}`).to.be.within(min, max)
    }
  })

  it('Generate random float', () => {
    for (let max = -1000; max < 1000; max = max + 0.94234) {
      let min = max - 1000
      const value = randFloat(min, max)
      expect(value, `randFloat(${min}, ${max})`).to.be.within(min, max)
    }
  })
});
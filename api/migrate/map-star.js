import Star from './../../entity/particles-sector/Star'
import StarLight from './../../entity/particles-sector/StarLight'
import { randInt } from './../../helper/integer/Integer'
import * as CONST from './../../app/constants'

const distance = 5000

/**
 *
 * @param {number} starKey
 * @returns {Array}
 */
export function mapRingStar(starKey) {
  const stars = []
  let range = 20
  for (let a = 1; a <= 20; a++) {
    for (let i = 0; i < 300; i++) {
      stars.push(
        new Star()
          .setKey(starKey)
          .updatePosition(distance, range * a, distance)
      )
    }
  }
  return stars
}

/**
 *
 * @param {number} starKey
 * @returns {Array}
 */
export function mapAroundStar(starKey) {
  const stars = []
  for (let i = 0; i < 10000; i++) {
    stars.push(
      new Star()
        .setKey(starKey)
        .updatePosition(distance, distance, distance)
    )
  }
  return stars
}

/**
 *
 * @param {number} starKey
 * @returns {Array}
 */
export function mapStar(starKey) {
  const ringStars = mapRingStar(starKey)
  const stars = mapAroundStar(starKey)
  return ringStars.concat(stars)
}
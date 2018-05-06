import Star from './../../entity/sector/Star'
import StarLight from './../../entity/sector/StarLight'
import { randInt } from './../../module/helper/Helper'
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

/**
 *
 * @param {number} starKey
 * @returns {Array}
 */
export function mapStarLights(starKey) {
  const stars = []
  for (let i = 1; i <= 8; i++) {
    const starLight = new StarLight()
    const star = new Star().updatePosition(distance, distance, distance)
    stars.push(
      starLight
        .setKey(starKey)
        .setFlareOptions({
          size: randInt(20, 100),
          textureKey: randInt(0, 1) ? CONST.KEY_LIGHT_CONTROLS_3 : CONST.KEY_LIGHT_CONTROLS_8
        })
        .setFlareGlowOptions(
          {
            enabled: false,//Boolean(randInt(0, 1)),
            size: randInt(20, 80)
          }
        )
        .setPosition(star.position.x, star.position.y, star.position.z)
    )
  }
  return stars
}
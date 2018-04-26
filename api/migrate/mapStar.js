import Star from './../../entity/sector/Star'
/**
 *
 * @param {number} key
 * @returns {Array}
 */
export function mapStar(key) {
  const stars = []
  let range = 20
  for (let a = 1; a <= 20; a++) {
    for (let i = 0; i < 300; i++) {
      stars.push(new Star().updatePosition(4000, range * a, 4000))
    }
  }
  for (let i = 0; i < 2000; i++) {
    stars.push(new Star().updatePosition(4000, 4000, 4000))
  }
  return stars
}
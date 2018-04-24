import Star from './../../entity/sector/Star'
/**
 *
 * @param {number} count
 * @param {number} key
 * @returns {Array}
 */
export function mapStar(count, key) {
  const stars = []
  for (let i = 0; i < count; i++) {
    stars.push(new Star().updatePosition())
  }
  return stars
}
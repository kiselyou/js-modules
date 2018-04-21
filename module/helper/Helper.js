
/**
 *
 * @param {number} min
 * @param {number} max
 * @returns {Number}
 */
export function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 *
 * @param {number} min
 * @param {number} max
 * @returns {Number}
 */
export function randFloat(min, max) {
  return Math.random() * (max - min) + min
}
import passwordHash from 'password-hash'
import generator from 'generate-password'

/**
 * @return {string}
 */
export function generatePassword() {
  return generator.generate({ length: 10, numbers: true })
}

/**
 *
 * @param {string} password
 * @returns {string}
 */
export function hashPassword(password) {
  return passwordHash.generate(password);
}

/**
 *
 * @param {string} password
 * @param {string} hashedPassword
 * @returns {boolean}
 */
export function comparePassword(password, hashedPassword) {
  return passwordHash.verify(password, hashedPassword);
}
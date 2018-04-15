import path from 'path'

/**
 *
 * @param {string} directory
 * @returns {string}
 */
export function basePath(directory) {
  return path.join(__dirname + directory)
}

/**
 *
 * @param {string} [file]
 * @returns {string}
 */
export function publicPath(file = '') {
  return basePath('/../../public/' + file.replace(/^\//, ''))
}
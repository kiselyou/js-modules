import objectPath from 'object-path'

/**
 *
 * @param {Object} req
 * @param {User} user
 */
export function setUserSession(req, user) {
  req.session.user = user
}

/**
 *
 * @param {Object} req
 * @returns {string|null}
 */
export function getUserSession(req) {
  return objectPath.get(req, ['session', 'user'], null)
}

/**
 *
 * @param {Object} req
 * @returns {boolean}
 */
export function removeUserSession(req) {
  if (req.session) {
    delete req.session.user
    req.session.destroy()
    return true
  }
  return false
}
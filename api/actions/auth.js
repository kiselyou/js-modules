import * as core from './../core'
import User from './../../entity/User'
import passwordHash from 'password-hash'
import objectPath from 'object-path'
import generator from 'generate-password'

/**
 *
 * @param {object} req
 * @param {object} res
 */
export async function userAuthorization(req, res) {
  const user = new User()
    .setEmail(req.body.email)
    .setPassword(hashPassword(req.body.password))

  const validator = core.validate('user-authorization', user)
  if (validator.length > 0) {
    core.responseJSON(res, { status: 0, msg: validator[0].message })
    return
  }

  if (getUserSession(req) === user.email) {
    core.responseJSON(res, { status: 0, msg: 'User is already logged on.' })
    return
  }

  const db = await core.mgDBAsync()
  const collection = db.collection('User')
  const userId = await collection.findOne({ email: user.email, password: user.password })


  if ( ! userId) {
    core.responseJSON(res, { status: 0, msg: 'User not found.' })
    return
  }

  // setUserSession(req, )
  // console.log(isUser)

  console.log(req.session)
  // if (!req.session) {
  //   req.session = {a: 1}
  // }


  core.responseJSON(res, {user: 1})
}

/**
 *
 * @param {object} req
 * @param {object} res
 */
export async function userRegistration(req, res) {
  const user = new User().setEmail(req.body.email)

  const validator = core.validate('user-registration', user)
  if (validator.length > 0) {
    core.responseJSON(res, { status: 0, msg: validator[0].message })
    return
  }

  const db = await core.mgDBAsync()
  const collection = db.collection('User')
  const userData = await collection.findOne({ email: user.email })

  if (userData) {
    core.responseJSON(res, { status: 0, msg: `User "${user.email}" has already exists.` })
    return
  }

  core.responseJSON(res, {user: 2})
}

/**
 *
 * @param {object} req
 * @param {object} res
 */
export async function userRestore(req, res) {
  const user = new User().setEmail(req.body.email)

  const validator = core.validate('user-restore', user)
  if (validator.length > 0) {
    core.responseJSON(res, { status: 0, msg: validator[0].message })
    return
  }

  core.responseJSON(res, {user: 2})
}

function sendPassword() {
  
}

/**
 * @return {string}
 */
function generatePassword() {
  return generator.generate({ length: 10, numbers: true })
}


/**
 *
 * @param {Object} req
 * @param {string} email
 */
function setUserSession(req, email) {
  req.session.userEmail = email
}

/**
 *
 * @param {Object} req
 * @returns {string|null}
 */
function getUserSession(req) {
  return objectPath.get(req, ['session', 'user'], null)
}

/**
 *
 * @param {string} password
 * @returns {string}
 */
function hashPassword(password) {
  return passwordHash.generate(password);
}

/**
 *
 * @param {string} password
 * @param {string} hashedPassword
 * @returns {boolean}
 */
function comparePassword(password, hashedPassword) {
  return passwordHash.verify(password, hashedPassword);
}
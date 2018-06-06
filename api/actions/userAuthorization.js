import * as core from './../core'
import User from './../../entity/User'
import passwordHash from 'password-hash'
import objectPath from 'object-path'

/**
 *
 * @param {object} req
 * @param {object} res
 */
export async function userAuthorization(req, res) {
  const user = new User()
    .setEmail(req.body.email)
    .setPassword(hashPassword(req.body.password))

  if (user.email === '' || user.password === '') {
    core.responseJSON(res, { status: 0, msg: 'Data is not valid.' })
    return
  }

  if (getUserSession(req) === user.email) {
    core.responseJSON(res, { status: 0, msg: 'User is already logged on.' })
    return
  }

  const db = await core.mgDBAsync()
  const collection = db.collection('User')
  const userId = await collection.findOne({ email: user.email, password: user.password })


  if ( ! isUser) {
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
 * @param {object} req
 * @param {object} res
 */
export async function userRegistration(req, res) {
  const email = req.body['email']


  core.responseJSON(res, {user: 2})
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
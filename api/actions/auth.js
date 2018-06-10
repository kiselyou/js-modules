import * as core from './../core'
import User from './../../entity/User'
import { createAndInsertPlayer } from './../repository/RepositoryPlayer'
import { getUserByEmail, insertUser } from './../repository/RepositoryUser'

const errorMsg = `Something went wrong. Try again some late.`

/**
 *
 * @param {object} req
 * @param {object} res
 */
export async function userAuthorization(req, res) {
  const user = new User()
    .setEmail(req.body.email)
    .setPassword(req.body.password)

  if (core.getUserSession(req)) {
    core.responseJSON(res, { status: 0, msg: 'User is already logged on.' })
    return
  }

  const validator = core.validate('auth-authorization', user)
  if (validator.length > 0) {
    core.responseJSON(res, { status: 0, msg: validator[0].message })
    return
  }

  const db = await core.mgDBAsync()
  const collection = db.collection('User')
  const userData = await collection.findOne({ email: user.email })

  if ( ! userData) {
    core.responseJSON(res, { status: 0, msg: 'User not found.' })
    return
  }

  if ( ! core.comparePassword(user.password, userData.password)) {
    core.responseJSON(res, { status: 0, msg: 'Login or password is not correct.' })
    return
  }

  delete userData['_id']
  delete userData['password']

  core.setUserSession(req, userData)
  core.responseJSON(res, { status: 1, msg: 'Login successful.', user: userData })
}

/**
 *
 * @param {object} req
 * @param {object} res
 */
export async function userRegistration(req, res) {
  const originPassword = core.generatePassword()
  const user = new User()
    .setEmail(req.body.email)
    .setPassword(core.hashPassword(originPassword))

  if (core.getUserSession(req)) {
    core.responseJSON(res, { status: 0, msg: 'User is already logged on.' })
    return
  }

  const params = { email: req.body.email, spaceshipId: req.body.spaceshipId }
  const validator = core.validate('auth-registration', params)
  if (validator.length > 0) {
    core.responseJSON(res, { status: 0, msg: validator[0].message })
    return
  }

  const userData = await getUserByEmail(user.email)

  if (userData) {
    core.responseJSON(res, { status: 0, msg: `User "${user.email}" has already exists.` })
    return
  }

  const subject = `Registration in Iron War Online Game.`

  const html = `
    <h4>Access to Iron War</h4><hr/>
    <b>Login:</b> ${user.email} <br/>
    <b>Password:</b> ${originPassword} <br/>
    <a href="http://${core.apiConfig.server.host}">Open Iron War</a>
  `

  core.sendMailHtml(user.email, subject, html)
    .then(async () => {
      await insertUser(user)
      await createAndInsertPlayer(user, req.body.spaceshipId)
      core.responseJSON(res, { status: 1, msg: 'Check your email to get access to Iron War.' })
    })
    .catch(() => core.responseJSON(res, { status: 0, msg: errorMsg }))
}

/**
 *
 * @param {object} req
 * @param {object} res
 */
export async function userRestore(req, res) {
  const originPassword = core.generatePassword()
  const user = new User()
    .setEmail(req.body.email)

  if (core.getUserSession(req)) {
    core.responseJSON(res, { status: 0, msg: 'User is already logged on.' })
    return
  }

  const validator = core.validate('auth-restore', user)
  if (validator.length > 0) {
    core.responseJSON(res, { status: 0, msg: validator[0].message })
    return
  }

  const db = await core.mgDBAsync()
  const collection = db.collection('User')
  const userData = await collection.findOne({ email: user.email })

  if ( ! userData) {
    core.responseJSON(res, { status: 0, msg: `User with email "${user.email}" does not exists.` })
    return
  }

  const subject = `Restore password for Iron War Online Game.`

  const html = `
    <h4>Access to Iron War</h4><hr/>
    <b>Login:</b> ${user.email} <br/>
    <b>New password:</b> ${originPassword} <br/>
    <a href="http://${core.apiConfig.server.host}">Open Iron War</a>
  `

  core.sendMailHtml(user.email, subject, html)
    .then(() => {
      collection.updateOne(
          { id: userData.id },
          { $set: { password: core.hashPassword(originPassword) } },
          { upsert: true }
        )
        .then(() => core.responseJSON(res, { status: 1, msg: 'Check your email to get access to Iron War.' }))
        .catch(() => core.responseJSON(res, { status: 0, msg: errorMsg }))
    })
    .catch(() => core.responseJSON(res, { status: 0, msg: errorMsg }))
}

/**
 *
 * @param {Object} req
 * @param {Object} res
 */
export function logout(req, res) {
  core.removeUserSession(req)
  core.redirect(res)
}
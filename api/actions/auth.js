import * as core from './../core'
import User from './../../entity/User'

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

  const validator = core.validate('user-authorization', user)
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

  core.setUserSession(req, userData)
  core.responseJSON(res, { status: 1, msg: 'Login successful.' })
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

  const subject = `Registration in Iron War Online Game.`

  const html = `
    <h4>Access to Iron War</h4><hr/>
    <b>Login:</b> ${user.email} <br/>
    <b>Password:</b> ${originPassword} <br/>
    <a href="http://${core.apiConfig.server.host}">Open Iron War</a>
  `

  core.sendMailHtml(user.email, subject, html)
    .then(() => {
      collection.insertOne(user)
        .then(() => core.responseJSON(res, { status: 1, msg: 'Check your email to get access to Iron War.' }))
        .catch(() => core.responseJSON(res, { status: 0, msg: errorMsg }))
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

  const validator = core.validate('user-restore', user)
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
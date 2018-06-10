import * as core from '../core'

export const insertUser = async function (user) {
  const db = await core.mgDBAsync()
  const collection = db.collection('User')
  await collection.insertOne(user)
}

/**
 *
 * @param {string} email
 * @returns {Promise<void>}
 */
export const getUserByEmail = async function (email) {
  const db = await core.mgDBAsync()
  const collection = db.collection('User')
  return await collection.findOne({ email: email })
}
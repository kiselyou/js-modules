import { MongoClient } from 'mongodb'
import { apiConfig } from '../config/config'

let client = null

/**
 * @callback closeConnectCallback
 */

/**
 * @param {Db} db - Example to use: db.collection('collectionName')
 * @param {closeConnectCallback} closeConnect
 * @callback onConnectCallback
 */

/**
 *
 * @param {onConnectCallback} onConnect
 * @returns {void}
 */
export function mgDB(onConnect) {
  const url = getUrl()
  MongoClient.connect(url, (err, client) => {
    if (err) {
      console.log(`${url} connection refused`)
      return
    }
    const db = client.db(apiConfig.db.mongo.dbName)
    onConnect(db, () => {
      client.close()
    })
  })
}

/**
 *
 * @returns {Promise<Db>}
 */
export async function mgDBAsync() {
  const url = getUrl()
  if (!client) {
    client = await MongoClient.connect(url)
  }
  return client.db(apiConfig.db.mongo.dbName)
}

/**
 * @returns {void}
 */
export function mgDBClose() {
  if (client) {
    client.close()
  }
  client = null
}

/**
 *
 * @returns {string}
 */
function getUrl() {
  return `mongodb://${apiConfig.db.mongo.host}:${apiConfig.db.mongo.port}`
}
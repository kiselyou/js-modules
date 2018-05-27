import { MongoClient } from 'mongodb'
import { apiConfig } from '../config/config'

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
  const url = `mongodb://${apiConfig.db.mongo.host}:${apiConfig.db.mongo.port}`
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
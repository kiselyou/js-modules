import { MongoClient } from 'mongodb'
import { config } from '../config/develop'

/**
 *
 * @param {string} collectionName
 * @returns {Promise<Collection>}
 */
export async function mgDB(collectionName) {
  const url = `mongodb://${config.db.mongo.host}:${config.db.mongo.port}`
  const client = await MongoClient.connect(url)
  const db = client.db(config.db.mongo.dbName);
  return db.collection(collectionName)
}
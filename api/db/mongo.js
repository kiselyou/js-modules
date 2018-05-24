import { MongoClient } from 'mongodb'
import { apiConfig } from '../config/config'

/**
 *
 * @param {string} collectionName
 * @returns {Promise<Collection>}
 */
export async function mgDB(collectionName) {
  const url = `mongodb://${apiConfig.db.mongo.host}:${apiConfig.db.mongo.port}`
  const client = await MongoClient.connect(url)
  const db = client.db(apiConfig.db.mongo.dbName);
  return db.collection(collectionName)
}
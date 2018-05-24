import { mgDB } from '../db/mongo'
import Universe from './../../entity/Universe'

class PlayGroundUniverse {
  constructor() {
    /**
     *
     * @type {number}
     */
    this.id = 1

    /**
     *
     * @type {Universe}
     */
    this.universe = new Universe(this.id)
  }

  /**
   *
   * @returns {Promise.<Universe>}
   */
  async getUniverse() {
    const collection = await mgDB('Universe')
    const universeData = await collection.findOne({id: this.id})
    return this.universe.copy(universeData)
  }

  /**
   *
   * @param {number} value
   * @returns {void}
   */
  updateTimestamp(value) {
    this.universe.setTimestamp(value)
    const collection = mgDB('Universe')
    collection.then((db) => {
      return db.updateOne(
        { id: this.id },
        { $set: { timestamp: value } },
        { upsert: true },
        (err) => {
          if (err) {
            throw new Error('Cannot upsert timestamp')
          }
        }
      )
    })
  }
}

export default PlayGroundUniverse
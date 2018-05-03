import { mgDB } from '../db/mongo'
import Universe from './../../entity/Universe'

class UniverseCollection {
  constructor() {
    /**
     *
     * @type {number}
     */
    this.id = 1
  }

  /**
   *
   * @returns {Universe}
   */
  async getUniverse() {
    const collection = await mgDB('Universe')
    const universeData = await collection.findOne({id: this.id})
    return new Universe(this.id).copy(universeData)
  }

  async updateTimestamp(value) {
    const collection = await mgDB('Universe')
    return collection.updateOne(
      { id: this.id },
      { $set: { timestamp: value } },
      { upsert: true },
      (err) => {
        if (err) {
          throw new Error('Cannot upsert timestamp')
        }
      }
    )
  }
}

export default UniverseCollection
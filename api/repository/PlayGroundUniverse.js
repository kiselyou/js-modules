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
    this.universe = new Universe()
  }

  /**
   * @param {Universe} universe
   * @callback universeInfoCallback
   */

  /**
   *
   * @param {universeInfoCallback} universeInfoCallback
   * @returns {void}
   */
  async findSectors(universeInfoCallback) {
    mgDB((db, closeConnect) => {
      const collection = db.collection('Universe')
      collection
        .findOne({ id: this.id })
        .catch((e) => console.log(e))
        .then((data) => {
          this.universe.copy(data)
          universeInfoCallback(this.universe)
        })
        .finally(closeConnect)
    })
  }

  /**
   *
   * @param {number} value
   * @returns {void}
   */
  updateTimestamp(value) {
    this.universe.setTimestamp(value)
    mgDB((db, closeConnect) => {
      const collection = db.collection('Universe')
      collection.updateOne(
          { id: this.id },
          { $set: { timestamp: value } },
          { upsert: true }
        )
        .catch(() => new Error('Cannot create/update "Universe" timestamp'))
        .finally(closeConnect)
    })
  }
}

export default PlayGroundUniverse
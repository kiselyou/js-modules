import uuidV4 from 'uuid/v4'
import Monitor from './dependence/Monitor'

class Race {
  constructor() {
    /**
     * @type {string}
     */
    this.entity = this.constructor.name

    /**
     * @type {string}
     */
    this.id = uuidV4()

    /**
     *
     * @type {string}
     */
    this.name = null

    /**
     *
     * @type {Monitor}
     */
    this.monitor = new Monitor()
  }

  /**
   *
   * @param {string} name
   * @returns {Race}
   */
  setName(name) {
    this.name = name
    return this
  }
}

export default Race
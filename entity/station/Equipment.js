import uuidV4 from 'uuid/v4'

class Equipment {
  constructor() {
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
     * @type {number}
     */
    this.weight = 1
  }
}

export default Equipment
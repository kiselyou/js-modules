import uuidV4 from 'uuid/v4'

class BankAccount {
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
     * @type {boolean}
     */
    this.enabled = true

    /**
     *
     * @type {number}
     */
    this.sum = 0
  }

  /**
   *
   * @param {object} data
   * @returns {BankAccount}
   */
  copy(data) {
    for (const property in data) {
      if (data.hasOwnProperty(property)) {
        switch (property) {
          case 'entity':
            break
          default:
            this[property] = data[property]
            break
        }
      }
    }
  }
}

export default BankAccount
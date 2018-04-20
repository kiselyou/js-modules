import uuidV4 from 'uuid/v4'

class BankAccount {
  constructor() {
    /**
     * @type {string}
     */
    this.className = this.constructor.name

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
}

export default BankAccount
import uuidV4 from 'uuid/v4'

/**
 * Создается для каждой записи Planet, Race, Player
 */
class Monitor {
  constructor() {
    /**
     * @type {string}
     */
    this.id = uuidV4()
  }
}

export default Monitor
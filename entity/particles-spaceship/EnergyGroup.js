import Energy from './Energy'

class EnergyGroup extends Energy {
  constructor() {
    super()
    /**
     *
     * @type {Array.<Energy>}
     */
    this.elements = []

    /**
     *
     * @type {Energy}
     */
    this.shipEnergy = new Energy()

    /**
     *
     * @type {Energy}
     */
    this.gunEnergy = new Energy()

    /**
     * Значение от 0 - 100 зависит от значения свойства "gunEnergy"
     *
     * @type {number}
     */
    this.shipEnergySize = 50

    /**
     * Значение от 0 - 100 зависит от значения свойства "shipEnergy"
     *
     * @type {number}
     */
    this.gunEnergySize = 50
  }

  /**
   *
   * @param {Energy} value
   * @returns {EnergyGroup}
   */
  addEnergy(value) {
    if (value instanceof Energy) {
      this.elements.push(value)
    } else {
      console.warn('You are trying to set not correct type on: new EnergyGroup().addEnergy(?) - expected "new Energy()"')
    }
    return this
  }

  /**
   *
   * @param {Energy} value
   * @returns {EnergyGroup}
   */
  removeEnergy(value) {
    const index = this.elements.indexOf(value)
    if (index >= 0) {
      this.elements.splice(index, 1)
    }
    return this
  }

  /**
   * Use this method after update values inside any Energy
   *
   * @returns {EnergyGroup}
   */
  updateEnergy() {
    this.size = 0
    this.restoreSize = 0
    for (const energy of this.elements) {
      this.size += energy.size
      this.restoreSize += energy.restoreSize
    }
    this.shipEnergy.setSize(this.size * this.shipEnergySize / 100)
    this.gunEnergy.setSize(this.size * this.gunEnergySize / 100)
    return this
  }

  /**
   *
   * @param {number} reduceSize
   * @param {Function} [onReduceCallback]
   * @returns {EnergyGroup}
   */
  reduceShipEnergy(reduceSize, onReduceCallback) {
    for (const energy of this.elements) {
      energy.reduce(reduceSize * this.shipEnergySize / 100)
    }
    this.shipEnergy.reduce(reduceSize, onReduceCallback)
    return this
  }

  /**
   *
   * @param {number} reduceSize
   * @param {Function} [onReduceCallback]
   * @returns {EnergyGroup}
   */
  reduceGunEnergy(reduceSize, onReduceCallback) {
    for (const energy of this.elements) {
      energy.reduce(reduceSize * this.gunEnergySize / 100)
    }
    this.gunEnergy.reduce(reduceSize, onReduceCallback)
    return this
  }

  /**
   *
   * @param {number} increaseSize
   * @param {Function} [onIncreaseCallback]
   * @returns {EnergyGroup}
   */
  increaseShipEnergy(increaseSize, onIncreaseCallback) {
    for (const energy of this.elements) {
      energy.increase(increaseSize * this.shipEnergySize / 100)
    }
    this.shipEnergy.increase(increaseSize, onIncreaseCallback)
    return this
  }

  /**
   *
   * @param {number} increaseSize
   * @param {Function} [onIncreaseCallback]
   * @returns {EnergyGroup}
   */
  increaseGunEnergy(increaseSize, onIncreaseCallback) {
    for (const energy of this.elements) {
      energy.increase(increaseSize * this.gunEnergySize / 100)
    }
    this.gunEnergy.increase(increaseSize, onIncreaseCallback)
    return this
  }

  /**
   * Use this method inside update (on each frame)
   *
   * @param {number} delta
   * @param {Function} [onChangeCallback]
   * @returns {EnergyGroup}
   */
  restoreEnergy(delta, onChangeCallback) {
    this.size = 0
    this.restoreSize = 0
    let needUpdateEnergy = false
    for (const energy of this.elements) {
      energy.restoreTimer(delta, () => {
        this.increaseShipEnergy(energy.restoreSize * this.shipEnergySize / 100, () => {
          needUpdateEnergy = true
        })
        this.increaseGunEnergy(energy.restoreSize * this.gunEnergySize / 100, () => {
          needUpdateEnergy = true
        })
      })

      this.size += energy.size
      this.restoreSize += energy.restoreSize
    }
    if (needUpdateEnergy) {
      this.updateEnergy()
      if (onChangeCallback) {
        onChangeCallback()
      }
    }
    return this
  }

  /**
   *
   * @param {Object|null} data - if is null then values will be reset to null
   * @param {Array} [except]
   * @returns {EnergyGroup}
   */
  copy(data, except = []) {
    super.copy(data, except.concat(['shipEnergy', 'gunEnergy', 'elements']))
    for (const property in data) {
      switch (property) {
        case 'entity':
          break
        case 'shipEnergy':
        case 'gunEnergy':
          this[property].copy(data[property])
          break
        case 'elements':
          for (const element of data[property]) {
            this.element.push(new Energy().copy(element))
          }
      }
    }
    return this
  }
}

export default EnergyGroup
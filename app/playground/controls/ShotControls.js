import ModelCharge from './models/charge/ModelCharge'
import { Vector3, Raycaster, Math as M, Mesh, CubeGeometry, MeshBasicMaterial } from 'three'
import { randInt } from '@helper/integer/Integer'

class ShotControls {
  /**
   *
   * @param {CharacterControls} character
   */
  constructor(character) {
    /**
     * @type {CharacterControls}
     */
    this.character = character

    /**
     *
     * @type {Array.<ModelCharge>}
     */
    this.charges = []

    /**
     * @param {number} action
     * @param {Object} swapInfo
     * @callback shotEventListener
     */

    /**
     *
     * @type {Array.<shotEventListener>}
     */
    this.shotListener = []
  }

  /**
   *
   * @returns {number}
   */
  static get EVENT_CHARGE_ADD() {
    return 1
  }

  /**
   *
   * @returns {number}
   */
  static get EVENT_CHARGE_UPDATE() {
    return 2
  }

  /**
   *
   * @returns {number}
   */
  static get EVENT_CHARGE_DELETE() {
    return 3
  }

  /**
   *
   * @returns {number}
   */
  static get EVENT_CHARGE_INTERSECT() {
    return 4
  }

  /**
   * Call this method to get shot swap info
   *
   * @param {shotEventListener} callback
   * @returns {ShotControls}
   */
  addShotEventListener(callback) {
    this.shotListener.push(callback)
    return this
  }

  /**
   *
   * @param {number} action
   * @param {Object} swapInfo
   * @returns {ShotControls}
   */
  callShotEvent(action, swapInfo) {
    for (const callback of this.shotListener) {
      callback(action, swapInfo)
    }
    return this
  }

  /**
   *
   * @param {number} action - This is value of constants of current class.
   * @param {Object} data - This is value from second argument of callback function "shotEventListener"
   */
  setShotSwapInfo(action, data) {
    let charge
    switch (action) {
      case ShotControls.EVENT_CHARGE_ADD:
        // Добавляем снаряд игроку B
        this.addCharge(
          new ModelCharge()
            .setModelChargeSwapInfo(data)
            .disableCalculation()
            .buildMesh()
        )
        break
      case ShotControls.EVENT_CHARGE_UPDATE:
        // TODO Корректировка позиции снаряда у игрока "B" возможно нет необходимости
        break
      case ShotControls.EVENT_CHARGE_DELETE:
        // Удаляем снаряд у игрока B
        charge = this.findChargeByName(data.name)
        this.removeCharge(charge)
        break
      case ShotControls.EVENT_CHARGE_INTERSECT:
        // TODO вычести урон
        const swapInfo = data['swapInfo']
        // Try to find CharacterControls by mode
        const targetModel = this.character.findModelByName(data['targetName'])
        const controls = this.character.findCharacter(targetModel)
        if (controls) {
          const charge = swapInfo['charge']
          const damageSize = randInt(charge['damageMin'], charge['damageMax'])

          const groupEnergy = controls.getGroupEnergy()
          const armorDamage = groupEnergy.getDamage(charge['type'])
          const damageArmorSize = armorDamage.getSize(damageSize)

          const shell = controls.getShell()
          const shellDamage = shell.getDamage(charge['type'])


          let damageShellSize = 0
          if (groupEnergy.isEnergy(damageArmorSize)) {
            groupEnergy.reduceShipEnergy(damageArmorSize)
            damageShellSize = shellDamage.getSize(damageArmorSize)
          } else {
            damageShellSize = shellDamage.getSize(damageSize)
          }

          if (shell.isShell(damageShellSize)) {
            shell.reduce(damageShellSize)
          }
          controls.userPanel.panelIndicator.update([1, 2])
        }

        // Try to find StationControls

        // Try to find AsteroidControls

        // Снаряд пересекся с объектом. Изменяем информацию у игрока B
        charge = this.findChargeByName(swapInfo.name)
        this.removeCharge(charge)
        break
    }
  }

  /**
   *
   * @returns {Spaceship}
   */
  get spaceship() {
    return this.character.spaceship
  }

  /**
   *
   * @returns {number}
   * @private
   */
  angleDirection(a, b) {
    return Math.atan2(b.z - a.z, b.x - a.x);
  }

  /**
   *
   * @param {Slot} slot
   * @param {Model} target
   * @param {ModelCharge} charge
   * @return {Vector3}
   */
  calculateShotDirection(slot, target, charge) {
    const calculate = this.character.calculate
    switch (slot.particle.direction) {
      // Стрельба прямо
      case 'direct':
        return this.character.getDirection()
      // Стрельба по цели
      case 'target':
        return calculate.getVectorDirection(charge.position, target.position)
      // Стрельба с упреждением
      case 'deflection':
      default:
        const controls = this.character.findCharacter(target)
        let targetSpeed = 0
        if (controls) {
          const engine = controls.getEngine()
          targetSpeed = engine.speed
        }

        const directTargetPosition = this.character.getNextPosition(slot.particle.charge.maxDistance)
        const angle = calculate.angleBetween(this.character.model.position, target.position, directTargetPosition)

        // стрельба в пределах радиуса с упреждением
        if (angle <= slot.particle.maxDeflection) {
          const deflection = calculate.deflection(target, targetSpeed, charge, slot.particle.charge.speed)
          return deflection.normalize()
        }

        return this.character.getDirection()
    }
  }

  /**
   *
   * @param {Slot} slot
   * @param {Model|?} [target]
   */
  shot(slot, target) {
    const objects = this.character.getModels()
    const modelCharge = new ModelCharge()
      .copyCharge(slot.particle.charge)
      .buildMesh()
      .onRemove(() => {
        this.removeCharge(modelCharge)
        this.callShotEvent(ShotControls.EVENT_CHARGE_DELETE, modelCharge.getModelChargeSwapInfo())
      })
      .setIntersectObjects(objects, (intersect) => {
        const targetName = intersect[0]['object']['name']
        const swapInfo = modelCharge.getModelChargeSwapInfo()
        this.callShotEvent(ShotControls.EVENT_CHARGE_INTERSECT, { targetName, swapInfo })
        this.removeCharge(modelCharge)
      })
      // Set slot position for ModelCharge. This value will be change bellow.
      // It need to calculate world position
      .setPosition(slot.position)

    // Calculate world position
    const worldPosition = this.character.calculate.getPositionInWorld(this.character.model, modelCharge)
    // Set world position for ModelCharge
    modelCharge.setPosition(worldPosition)

    const direction = this.calculateShotDirection(slot, target, modelCharge)
    modelCharge.setDirection(direction).enable(true)

    this.addCharge(modelCharge)
    this.callShotEvent(ShotControls.EVENT_CHARGE_ADD, modelCharge.getModelChargeSwapInfo())
  }

  /**
   *
   * @param {ModelCharge} charge
   * @return {ShotControls}
   */
  addCharge(charge) {
    this.character.scene.add(charge)
    this.charges.push(charge)
    return this
  }

  /**
   *
   * @param {string} name
   * @returns {ModelCharge|?}
   */
  findChargeByName(name) {
    for (const charge of this.charges) {
      if (charge.name === name) {
        return charge
      }
    }
    return null
  }

  /**
   *
   * @param {ModelCharge} charge
   * @return {ShotControls}
   */
  removeCharge(charge) {
    if (!charge) {
      return this
    }

    this.character.scene.remove(charge)
    for (let i = 0; i < this.charges.length; i++) {
      if (this.charges[i]['id'] === charge['id']) {
        this.character.scene.remove(charge)
        this.charges.splice(i, 1)
        break
      }
    }
    return this
  }

  /**
   *
   * @param {number} delta
   */
  update(delta) {
    for (const charge of this.charges) {
      charge.update(delta)
    }
  }
}

export default ShotControls
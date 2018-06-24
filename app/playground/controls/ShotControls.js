import ModelCharge from './models/charge/ModelCharge'
import GunArea from '../decoration/GunArea'
import Model from './models/Model'
import { Vector3, Raycaster } from 'three'

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
     * @type {GunArea}
     */
    this.gunArea = new GunArea()

    /**
     *
     * @type {Raycaster}
     */
    this.raycaster = new Raycaster()

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
        const modelCharge = new ModelCharge().setModelChargeSwapInfo(data).buildMesh()
        this.addCharge(modelCharge)
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
        // Снаряд пересекся с объектом. Изменяем информацию у игрока B
        charge = this.findChargeByName(data.name)
        this.removeCharge(charge)
        break
    }
  }

  /**
   *
   * @returns {Array.<Model>}
   */
  getModelsFromScene() {
    const models = []
    for (const element of this.character.scene.children) {
      if (element instanceof Model) {
        models.push(element.children[0])
      }
    }
    return models
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
   * @param {string} slotId
   * @param {Vector3|?} [target]
   */
  shot(slotId, target) {
    const slot = this.spaceship.getSlotById(slotId)
    if ( ! slot) {
      return this
    }

    const objects = this.getModelsFromScene()
    const direction = this.character.getDirection()
    const modelCharge = new ModelCharge()
      .copyCharge(slot.particle.charge)
      // Set slot position for ModelCharge. This value will be change bellow.
      // It need to calculate world position
      .setPosition(slot.position)
      .setDirection(direction)
      .setTarget(target)
      .buildMesh()
      .onRemove(() => {
        this.removeCharge(modelCharge)
        this.callShotEvent(ShotControls.EVENT_CHARGE_DELETE, modelCharge.getModelChargeSwapInfo())
      })
      .setIntersectObjects(objects, (intersect) => {
        this.callShotEvent(ShotControls.EVENT_CHARGE_INTERSECT, modelCharge.getModelChargeSwapInfo())
      })

    // Calculate world position
    const worldPosition = this.character.calculate.getPositionInWorld(this.character.model, modelCharge)
    // Set world position for ModelCharge
    modelCharge.setPosition(worldPosition).enable(true)

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
      if (charge.enabled) {
        charge.update(delta)
      }
    }
  }

  /**
   *
   * @return {Promise<void>}
   */
  async beforeStart() {
    await this.gunArea.beforeStart()
    this.character.model.addToGroup(this.gunArea)
  }

  /**
   *
   * @param {Intersect} intersect
   * @param {MouseEvent} mouseEvent
   * @returns {void}
   */
  onMouseClick(intersect, mouseEvent) {

  }
}

export default ShotControls
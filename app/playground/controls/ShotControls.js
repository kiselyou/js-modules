import ModelCharge from './models/charge/ModelCharge'
import Slot from '@entity/particles-spaceship/Slot'
import Gun from '@entity/particles-spaceship/Gun'
import { Vector3, Mesh, MeshBasicMaterial, BoxGeometry } from 'three'

class ShotControls {
  /**
   *
   * @param {CharacterControls} characterControls
   */
  constructor(characterControls) {
    /**
     * @type {CharacterControls}
     */
    this.character = characterControls

    /**
     *
     * @type {Array.<Slot>}
     */
    this.slots = []

    /**
     *
     * @type {Array.<ModelCharge>}
     */
    this.charges = []
  }

  /**
   *
   * @param {string} id
   * @returns {Slot|?}
   */
  getSlot(id) {
    const slot = this.slots.find((slot) => slot.id === id)
    return slot || null
  }

  /**
   *
   * @param {string} slotId
   * @returns {Charge}
   */
  getChargeBySlotId(slotId) {
    const slot = this.getSlot(slotId)
    return slot ? slot.particle.charge : null
  }

  /**
   *
   * @param {Slot} slot
   * @returns {ShotControls}
   */
  addSlot(slot) {
    this.slots.push(slot)
    return this
  }

  /**
   *
   * @param {Spaceship} spaceship
   * @returns {ShotControls}
   */
  setSlots(spaceship) {
    for (const slot of spaceship.slot) {
      if (slot.particle instanceof Gun) {
        this.addSlot(slot)
      }
    }
    return this
  }

  /**
   *
   * @param {string} slotId
   * @param {Vector3|?} [target]
   */
  shot(slotId, target) {
    const slot = this.getSlot(slotId)

    if ( ! slot) {
      return this
    }

    // Mesh, MeshBasicMaterial, BoxGeometry
    const m = new MeshBasicMaterial({color: 0xFF0000})
    const g = new BoxGeometry(10, 10, 10)
    const mesh = new Mesh(g, m)
    mesh.position.set(this.character.position.x, this.character.position.y, this.character.position.z + 600)
    this.character.scene.add(mesh)

    const direction = this.character.getDirection()
    const modelCharge = new ModelCharge(mesh)
      .copyCharge(slot.particle.charge)
      .copyPosition(slot.position)
      .setDirection(direction)
      .setTarget(target)
      .buildMesh()
      .onRemove(() => this.removeCharge(modelCharge))


    this.addCharge(modelCharge)
  }

  /**
   *
   * @param {ModelCharge} charge
   * @return {ShotControls}
   */
  addCharge(charge) {
    const startPosition = this.character.calculate.getPositionInWorld(this.character, charge)
    charge.copyPosition(startPosition).enable(true)

    this.character.scene.add(charge)
    this.charges.push(charge)
    return this
  }

  /**
   *
   * @param {ModelCharge} charge
   * @return {ShotControls}
   */
  removeCharge(charge) {
    this.character.scene.remove(charge)
    for (let i = 0; i < this.charges.length; i++) {
      if (this.charges[i]['id'] === charge['id']) {
        this.character.scene.remove(charge)
        this.charges.splice(i, 1)
        break
      }
    }
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

  async beforeStart() {

  }
}

export default ShotControls
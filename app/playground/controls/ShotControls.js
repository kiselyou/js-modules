import ModelCharge from './models/charge/ModelCharge'
import Slot from '@entity/particles-spaceship/Slot'
import Gun from '@entity/particles-spaceship/Gun'
import { Vector3, Mesh, MeshBasicMaterial, SphereGeometry } from 'three'

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
    console.log(spaceship, this.slots)
    return this
  }

  /**
   *
   * @param {string} slotId
   * @param {Vector3} target
   */
  shot(slotId, target) {
    const slot = this.getSlot(slotId)
    if ( ! slot) {
      return this
    }

    const charge = new ModelCharge()
      .setTarget(target)
      .buildMesh()
    charge.position.copy(slot.position)
    this.addCharge(charge)
  }

  /**
   *
   * @param {ModelCharge} charge
   * @return {ShotControls}
   */
  addCharge(charge) {
    const ship = this.character
    const calc = this.character.calculate

    ship.add(charge)
    charge.position.copy(calc.getChildPositionInWorld(ship, charge))
    ship.remove(charge)
    ship.scene.add(charge)
    this.charges.push(charge)
    charge.enable(true)
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
        this.charges.splice(i, 1)
        break
      }
    }
  }

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
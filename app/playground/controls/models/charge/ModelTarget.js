import TargetSpriteShot from '@app/playground/decoration/TargetSpriteShot'
import DetectObject3D from '@helper/DetectObject3D'

class ModelTarget {
  /**
   *
   * @param {Model} model
   * @param {Array.<Slot>} slots
   */
  constructor(model, slots) {
    /**
     *
     * @type {Array.<Slot>}
     */
    this.slots = slots

    /**
     *
     * @type {Model}
     */
    this.model = model

    /**
     *
     * @type {?Sprite}
     */
    this.sprite = null
  }

  /**
   *
   * @param {Array.<Slot>} slots
   * @returns {ModelTarget}
   */
  addSlots(slots) {
    for (const slot of slots) {
      if (this.slots.indexOf(slot) === -1) {
        this.slots.push(slot)
      }
    }
    return this
  }

  /**
   *
   * @param {Slot} slot
   * @returns {ModelTarget}
   */
  removeSlot(slot) {
    const index = this.slots.indexOf(slot)
    if (index >= 0) {
      this.slots.splice(index, 1)
    }
    return this
  }

  /**
   * Создает новый спрайт предварительно удаляя старый.
   * Если количество слотов 0 - то старый спрайт будет удален а новый построен не будет.
   *
   * @returns {ModelTarget}
   */
  draw() {
    if (this.sprite) {
      this.model.remove(this.sprite)
    }
    if (this.slots.length > 0) {
      const size = DetectObject3D.size(this.model)
      this.sprite = new TargetSpriteShot(this.slots).getSprite()
      this.sprite.position.y = (size.y / 2 + 2)
      this.model.add(this.sprite)
    }
    return this
  }
}

export default ModelTarget
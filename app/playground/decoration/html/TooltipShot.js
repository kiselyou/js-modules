import Tooltip from './Tooltip'
import { templateTooltipShot } from './templates'

class TooltipShot extends Tooltip {
  /**
   *
   * @param {Playground} playground
   */
  constructor(playground) {
    super(playground)

    this.templateHTML = templateTooltipShot

    /**
     *
     * @type {number}
     */
    this.top = -65

    /**
     *
     * @type {boolean}
     */
    this.horizontal = true

    /**
     *
     * @type {boolean}
     */
    this.vertical = true

    /**
     *
     * @type {Array.<Slot>}
     */
    this.slots = []

    /**
     * 0 - center
     * 1 - left
     * 2 - top
     * 3 - right
     * 4 - bottom
     *
     * @type {Number}
     */
    this.side = 0
  }

  /**
   *
   * @param {Array.<Slot>} value
   * @returns {TooltipShot}
   */
  setSlots(value) {
    for (const slot of value) {
      if (this.slots.indexOf(slot) === -1) {
        this.slots.push(slot)
      }
    }
    return this
  }

  /**
   *
   * @param {Slot} value
   * @returns {TooltipShot}
   */
  addSlots(value) {
    this.slots.push(value)
    return this
  }

  /**
   *
   * @param {Slot} value
   * @returns {TooltipShot}
   */
  removeSlot(value) {
    const index = this.slots.indexOf(value)
    if (index >= 0) {
      this.slots.splice(index, 1)
    }
    return this
  }

  /**
   *
   * @param {Number} delta
   * @returns {void}
   */
  update(delta) {
    if (this.visible) {
      const v = this.getPosition()

      const canvas = this.playground.renderer.domElement;

      // противоположная сторона
      if (this.isTargetVisible(delta, v)/*intersection.length === 0*/) {
        const halfWidth = canvas.width / 2
        if (v.x <= halfWidth) {
          v.x = canvas.width
        } else if (v.x >= halfWidth)  {
          v.x = -1
        }
      }

      let side = 0

      if (v.x < 0) {
        v.x = 0
        side = 1
      }

      if (v.x >= canvas.width) {
        v.x = canvas.width - this.left - this.template.clientWidth
        side = 3
      }

      if (v.y < 0) {
        v.y = 0
        side = 2
      }

      if (v.y >= canvas.height) {
        v.y = canvas.height - this.top - this.template.clientHeight
        side = 4
      }

      if (this.side !== side) {
        this.side = side
        this.redraw()
      }

      if (this.side !== 0) {
        this.template.style.top = `${v.y}px`;
        this.template.style.left = `${v.x}px`;
        return
      }

      let top = v.y + this.top
      if (this.vertical) {
        top += this.template.clientHeight / 2
      }
      this.template.style.top = `${top}px`;

      let left = v.x + this.left
      if (this.horizontal) {
        left -= this.template.clientWidth / 2
      }
      this.template.style.left = `${left}px`;
    }
  }
}

export default TooltipShot
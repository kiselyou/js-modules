import Tooltip from './Tooltip'
import { templateTooltipShot } from './templates'
import {Math as M, Vector3} from "three";

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
     * @type {Array.<Slot>}
     */
    this.slots = []
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
   * @returns {void}
   */
  update() {
    if (this.visible) {
      const v = this.getPosition()

      // Проверить находится ли объект поле видимости камеры
      const mouse = this.playground.intersect.prepareMousePosition(v.x, v.y)
      const intersection = this.playground.intersect.findMouseIntersection(mouse.x, mouse.y, [this.target])

      const canvas = this.playground.renderer.domElement;

      if (intersection.length === 0) {
        // противоположная сторона

        const halfWidth = canvas.width / 2
        if (v.x <= halfWidth) {
          v.x = canvas.width
        } else if (v.x >= halfWidth)  {
          v.x = -1
        }
      }

      if (v.x < 0) {
        v.x = 0
      }

      if (v.x >= canvas.width) {
        v.x = canvas.width - this.left - this.template.clientWidth
      }

      if (v.y < 0) {
        v.y = 0
      }

      if (v.y >= canvas.height) {
        v.y = canvas.height - this.top - this.template.clientHeight
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
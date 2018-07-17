import { Vector3 } from 'three'
import { templateTooltipInfo } from './templates'

class Tooltip {
  /**
   *
   * @param {Playground} playground
   */
  constructor(playground) {
    /**
     * @type {Playground}
     */
    this.playground = playground

    /**
     *
     * @type {Element}
     */
    this.template = document.createElement('div')
    this.template.classList.add('tooltip')

    /**
     *
     * @type {Function}
     */
    this.templateHTML = templateTooltipInfo

    /**
     *
     * @type {Vector3}
     */
    this.position = new Vector3()

    /**
     *
     * @type {?Model}
     */
    this.target = null

    /**
     *
     * @type {boolean}
     */
    this.visible = false

    /**
     *
     * @type {number}
     */
    this.left = 0

    /**
     *
     * @type {number}
     */
    this.top = 0

    /**
     *
     * @type {boolean}
     */
    this.horizontal = false

    /**
     *
     * @type {boolean}
     */
    this.vertical = false

    /**
     *
     * @type {boolean}
     * @private
     */
    this._visible = true

    /**
     *
     * @type {number}
     * @private
     */
    this._visibleTimer = 0
  }

  /**
   *
   * @param {number} value
   * @returns {Tooltip}
   */
  setLeft(value) {
    this.left = value
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {Tooltip}
   */
  setTop(value) {
    this.top = value
    return this
  }

  /**
   *
   * @param {boolean} value
   * @returns {Tooltip}
   */
  verticalAlign(value) {
    this.vertical = value
    return this
  }

  /**
   *
   * @param {boolean} value
   * @returns {Tooltip}
   */
  horizontalAlign(value) {
    this.horizontal = value
    return this
  }

  /**
   *
   * @returns {?Vector3}
   */
  getPosition() {
    if (this.target) {
      this.position.copy(this.target.position)
      this.position.project(this.playground.camera);

      const canvas = this.playground.renderer.domElement;
      this.position.x = Math.round((0.5 + this.position.x / 2) * (canvas.width / window.devicePixelRatio));
      this.position.y = Math.round((0.5 - this.position.y / 2) * (canvas.height / window.devicePixelRatio));
      return this.position
    }
    return null
  }

  /**
   *
   * @param {Model} value
   * @returns {Tooltip}
   */
  setTarget(value) {
    this.target = value
    return this
  }

  /**
   *
   * @returns {Tooltip}
   */
  draw() {
    this.visible = true
    this.template.innerHTML = this.templateHTML(this)
    document.body.appendChild(this.template)
    return this
  }

  /**
   *
   * @returns {Tooltip}
   */
  redraw() {
    this.remove().draw()
    return this
  }

  /**
   *
   * @returns {Tooltip}
   */
  clear() {
    this.target = null
    this.remove()
    return this
  }

  /**
   *
   * @returns {Tooltip}
   */
  remove() {
    if (this.visible) {
      this.visible = false
      document.body.removeChild(this.template)
    }
    return this
  }

  /**
   * Проверить находится ли объект поле видимости камеры
   *
   * @param {number} delta
   * @param {Vector3|Vector2} v
   * @returns {boolean}
   */
  isTargetVisible(delta, v) {
    this._visibleTimer += delta
    if (this._visibleTimer * 1000 >= 100) {
      this._visibleTimer = 0
      const mouse = this.playground.intersect.prepareMousePosition(v.x, v.y)
      const intersection = this.playground.intersect.findMouseIntersection(mouse.x, mouse.y, [this.target])
      this._visible = (intersection.length === 0)
    }

    return this._visible
  }

  /**
   *
   * @param {Number} delta
   * @returns {void}
   */
  update(delta) {
    if (this.visible) {
      const v = this.getPosition()
      if (this.isTargetVisible(delta, v)) {
        this.remove()
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

export default Tooltip
import {Vector3, CanvasTexture, SpriteMaterial, Sprite} from "three";

const template = (model) => {
  return `
    <div class="tooltip__content">
      <div class="tooltip__title">
        <b>${model.name}</b>
      </div>
      <div class="tooltip__body">
        <b>Description: </b>
        ${model.description || ''}
      </div>
    </div>
  `
}

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
     * @type {Vector3}
     */
    this.position = new Vector3()

    /**
     *
     * @type {?Model}
     */
    this.model = null

    /**
     *
     * @type {boolean}
     */
    this.visible = false
  }

  /**
   *
   * @returns {?Vector3}
   */
  getPosition() {
    if (this.model) {
      const vector = this.position.copy(this.model.position)
      const canvas = this.playground.renderer.domElement;
      vector.project(this.playground.camera);
      vector.x = Math.round((0.5 + vector.x / 2) * (canvas.width / window.devicePixelRatio));
      vector.y = Math.round((0.5 - vector.y / 2) * (canvas.height / window.devicePixelRatio));
      return vector
    }
    return null
  }

  /**
   *
   * @param {Model} value
   * @returns {Tooltip}
   */
  draw(value) {
    this.model = value
    this.visible = true
    this.template.innerHTML = template(this.model.reference)
    document.body.appendChild(this.template)
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
   *
   * @returns {void}
   */
  update() {
    if (this.visible) {
      const v = this.getPosition()

      // Проверить находится ли объект поле видимости камеры
      const mousePosition = this.playground.intersect.prepareMousePosition(v.x, v.y)
      const intersection = this.playground.intersect.findMouseIntersection(mousePosition.x, mousePosition.y, [this.model])

      if (intersection.length === 0) {
        this.remove()
        return
      }

      this.template.style.top = `${v.y}px`;
      this.template.style.left = `${v.x}px`;
    }
  }
}

export default Tooltip
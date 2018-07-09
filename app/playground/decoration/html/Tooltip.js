import {Vector3} from 'three'

/**
 *
 * @param {{distance: number, face: Face3, faceIndex: number, object: Model, point: Vector3, uv: Vector2}} intersection
 * @param {Playground} playground
 * @returns {string}
 */
const template = (intersection, playground) => {

  const model = intersection.object.reference
  const position = intersection.object.position
  const distance = playground.character.model.position.distanceTo(position)
  return `
    <div class="tooltip__content">
      <div class="tooltip__title">
        <b>${model.name}</b>
      </div>
      <div class="tooltip__body">
        <b>Description: </b>
        ${model.description || ''}
      </div>
      <b>Distance: </b>${distance.toFixed(0)}<br/>
      <b>Position: </b>
      x - ${position.x.toFixed(0)}, 
      z - ${position.z.toFixed(0)}
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
     * @type {?{distance: number, face: Face3, faceIndex: number, object: Model, point: Vector3, uv: Vector2}}
     */
    this.intersection = null

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
    if (this.intersection) {
      const vector = this.position.copy(this.intersection.object.position)
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
   * @param {{distance: number, face: Face3, faceIndex: number, object: Model, point: Vector3, uv: Vector2}} value
   * @returns {Tooltip}
   */
  draw(value) {
    this.intersection = value
    this.visible = true
    this.template.innerHTML = template(this.intersection, this.playground)
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
      this.intersection = null
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
      const intersection = this.playground.intersect.findMouseIntersection(mousePosition.x, mousePosition.y, [this.intersection.object])

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
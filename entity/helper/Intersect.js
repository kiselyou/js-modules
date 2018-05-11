import { PerspectiveCamera, Raycaster, Vector2, Vector3 } from 'three'
import Projector from '@app/three-dependense/Projector'

class Intersect {
  /**
   *
   * @param {PerspectiveCamera} camera
   */
  constructor(camera) {
    /**
     *
     * @type {PerspectiveCamera}
     */
    this.camera = camera

    /**
     *
     * @type {Vector2}
     */
    this.mouse = new Vector2()

    /**
     *
     * @type {Vector3}
     */
    this.dirrection = new Vector3(0, 0, 1)

    /**
     *
     * @type {Raycaster}
     */
    this.raycaster = new Raycaster()

    /**
     *
     * @type {Projector}
     */
    this.projector = new Projector()
  }

  /**
   *
   * @param {MouseEvent} mouseEvent
   * @returns {Intersect}
   */
  updateMouse(mouseEvent) {
    this.mouse.x = (mouseEvent.clientX / window.innerWidth) * 2 - 1
    this.mouse.y = - (mouseEvent.clientY / window.innerHeight) * 2 + 1
    return this
  }

  /**
   *
   * @param {Array.<Mesh>|Mesh} elements
   * @param {boolean} recursive
   * @returns {boolean}
   */
  is(elements, recursive = false) {
    this.dirrection.setX(this.mouse.x)
    this.dirrection.setY(this.mouse.y)
    this.dirrection.unproject(this.camera)
    this.raycaster.ray.origin = this.camera.position
    this.raycaster.ray.direction = this.dirrection.sub(this.camera.position).normalize()
    let intersects
    if (Array.isArray(elements)) {
      intersects = this.raycaster.intersectObjects(elements, recursive)
    } else {
      intersects = this.raycaster.intersectObject(elements, recursive)
    }

    return intersects.length > 0
  }
}

export default Intersect
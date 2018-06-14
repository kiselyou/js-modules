import Charge from '@entity/particles-spaceship/Charge'
import { Object3D, Vector3, Mesh, MeshBasicMaterial, SphereGeometry, Raycaster } from 'three'

class ModelCharge extends Object3D {
  constructor() {
    super()

    /**
     *
     * @type {number}
     */
    this.speed = 510

    /**
     *
     * @type {Charge}
     */
    this.charge = new Charge()

    /**
     *
     * @type {Vector3}
     */
    this.start = new Vector3()

    /**
     *
     * @type {Vector3}
     */
    this.target = new Vector3()

    /**
     *
     * @type {Vector3}
     */
    this.prev = new Vector3()

    /**
     *
     * @type {Vector3}
     */
    this.direction = new Vector3()

    /**
     *
     * @type {Raycaster}
     */
    this.raycaster = new Raycaster()

    /**
     * @callback removeEvent
     */

    /**
     *
     * @type {removeEvent}
     */
    this.removeEvent = null

    /**
     * Callback function if found intersected object
     *
     * @param {Array.<{distance: number, face: Face3, faceIndex: number, object: Mesh, point: Vector3, uv: Vector2}>} intersect
     * @callback intersectEvent
     */

    /**
     * Callback function if found intersected object
     *
     * @type {Array.<intersectEvent>}
     */
    this.intersectEvents = []

    /**
     * Objects to check intersection
     *
     * @type {Array.<Model|Mesh>}
     */
    this.intersectObjects = []

    /**
     *
     * @type {boolean}
     */
    this.enabled = false
  }

  /**
   *
   * @param {Array.<Model|Mesh>} objects
   * @param {intersectEvent} intersectEvent
   * @returns {ModelCharge}
   */
  setIntersectObjects(objects, intersectEvent) {
    this.intersectObjects = objects
    this.intersectEvents.push(intersectEvent)
    return this
  }

  /**
   *
   * @returns {ModelCharge}
   */
  buildMesh() {
    const geometry = new SphereGeometry(0.9, 6, 6)
    const material = new MeshBasicMaterial({ color: 0xFF0000 })
    this.add(new Mesh(geometry, material))
    return this
  }

  /**
   *
   * @param {Charge|Object} data
   * @returns {ModelCharge}
   */
  copyCharge(data) {
    this.charge.copy(data)
    return this
  }

  /**
   *
   * @param {Vector3} value
   * @returns {ModelCharge}
   */
  copyPosition(value) {
    this.start.copy(value)
    this.position.copy(value)
    return this
  }

  /**
   *
   * @param {Vector3} v
   * @return {ModelCharge}
   */
  setTarget(v) {
    this.target.copy(v)
    return this
  }

  /**
   *
   * @param {Vector3} v
   * @return {ModelCharge}
   */
  setDirection(v) {
    this.direction.copy(v)
    return this
  }

  /**
   *
   * @param {boolean} value
   * @return {ModelCharge}
   */
  enable(value = true) {
    this.enabled = value
    return this
  }

  /**
   *
   * @param {removeEvent} event
   * @returns {ModelCharge}
   */
  onRemove(event) {
    this.removeEvent = event
    return this
  }

  /**
   *
   * @param {Array.<Mesh>} objects
   * @param {Vector3} rayStart
   * @param {Vector3} direction
   * @param {number|Infinity} [far]
   * @returns {Array.<{distance: number, face: Face3, faceIndex: number, object: Mesh, point: Vector3, uv: Vector2}>}
   */
  isRayIntersect(objects, rayStart, direction, far = Infinity) {
    this.raycaster.ray.origin.copy(rayStart)
    this.raycaster.ray.direction.copy(direction)
    this.raycaster.near = 0
    this.raycaster.far = far
    return this.raycaster.intersectObjects(objects, true)
  }

  /**
   *
   * @private
   * @returns {Array<{distance: number, face: Face3, faceIndex: number, object: Mesh, point: Vector3, uv: Vector2}>}
   */
  _findIntersection() {
    const far = this.prev.distanceTo(this.position)
    return this.isRayIntersect(this.intersectObjects, this.prev, this.direction, far)
  }

  /**
   *
   * @private
   * @returns {void}
   */
  _remove() {
    this.enable(false)
    if (this.removeEvent) {
      this.removeEvent()
    }
  }

  /**
   *
   * @param {number} delta
   * @returns {void}
   */
  update(delta) {
    if (this.enabled) {
      this.prev.copy(this.position)
      this.position.addScaledVector(this.direction, this.charge.speed * delta)

      const intersects = this._findIntersection()
      if (intersects.length > 0) {
        this._remove()
        for (const callback of this.intersectEvents) {
          callback(intersects)
        }
        return
      }

      const distance = this.start.distanceTo(this.position)
      if (distance >= this.charge.maxDistance) {
        this._remove()
      }
    }
  }
}

export default ModelCharge
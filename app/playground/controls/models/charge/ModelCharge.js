import uuid from 'uuid/v4'
import Charge from '@entity/particles-spaceship/Charge'
import { Object3D, Vector3, Mesh, MeshBasicMaterial, SphereGeometry, Raycaster } from 'three'

class ModelCharge extends Object3D {
  constructor() {
    super()

    /**
     * @type {string}
     */
    this.name = uuid()

    /**
     *
     * @type {Charge}
     */
    this.charge = new Charge()

    /**
     * This is start position of model
     *
     * @type {Vector3}
     */
    this.start = new Vector3()

    /**
     * This is previous position of model
     *
     * @type {Vector3}
     */
    this.prev = new Vector3()

    /**
     * This is direction of model
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

    /**
     *
     * @type {boolean}
     */
    this.disableCalc = false
  }

  /**
   *
   * @returns {ModelCharge}
   */
  disableCalculation(value = true) {
    this.disableCalc = value
    return this
  }

  /**
   *
   * @param {string} value
   * @returns {ModelCharge}
   */
  setName(value) {
    this.name = value
    return this
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
    const geometry = new SphereGeometry(0.2, 6, 6)
    const material = new MeshBasicMaterial({ color: 0xCCCCCC })
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
  setPosition(value) {
    this.start.copy(value)
    this.position.copy(value)
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
   * @param {Array.<Model>} objects
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
    return this.raycaster.intersectObjects(objects, false)
  }

  /**
   *
   * @private
   * @param {Array.<Model>} intersectionModels
   * @returns {Array<{distance: number, face: Face3, faceIndex: number, object: Mesh, point: Vector3, uv: Vector2}>}
   */
  _findIntersection(intersectionModels) {
    const far = this.prev.distanceTo(this.position)
    return this.isRayIntersect(intersectionModels, this.prev, this.direction, far)
  }

  /**
   *
   * @private
   * @returns {void}
   */
  _remove() {
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
      if (this.disableCalc) {
        this.position.addScaledVector(this.direction, this.charge.speed * delta)
        return
      }
      this.prev.copy(this.position)
      this.position.addScaledVector(this.direction, this.charge.speed * delta)

      const distance = this.start.distanceTo(this.position)
      if (distance >= this.charge.maxDistance) {
        this.enable(false)
        this._remove()
        return
      }

      const intersects = this._findIntersection(this.intersectObjects)
      if (intersects.length > 0) {
        this.enable(false)
        for (const callback of this.intersectEvents) {
          callback(intersects)
        }
      }
    }
  }

  /**
   * @returns {Object}
   */
  getModelChargeSwapInfo() {
    const data = {}
    const properties = [
      'name',
      'enabled',
      'direction',
      'position',
      'charge'
    ]
    for (const property of properties) {
      switch (property) {
        case 'charge':
          data['charge'] = this.charge.getChargeSwapInfo()
          break
        default:
          data[property] = this[property]
          break
      }
    }
    return data
  }

  /**
   *
   * @param {Object} data - this is value from "this.getModelChargeSwapInfo()"
   * @returns {ModelCharge}
   */
  setModelChargeSwapInfo(data) {
    for (const property in data) {
      if (data.hasOwnProperty(property)) {
        switch (property) {
          case 'charge':
            this.charge.setChargeSwapInfo(data[property])
            break
          case 'direction':
          case 'position':
            this[property].copy(data[property])
            break
          default:
            this[property] = data[property]
            break
        }
      }
    }
    return this
  }
}

export default ModelCharge
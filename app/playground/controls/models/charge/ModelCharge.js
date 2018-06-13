import Charge from '@entity/particles-spaceship/Charge'
import { Object3D, Vector3, Mesh, MeshBasicMaterial, SphereGeometry, Ray, Box3, Raycaster } from 'three'

class ModelCharge extends Object3D {
  constructor(mesh) {
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
     * @type {Ray}
     */
    this.ray = new Ray()

    /**
     *
     * @type {Ray}
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
     *
     * @type {boolean}
     */
    this.enabled = false

    this.test = mesh
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
   * @param {number} delta
   * @returns {void}
   */
  update(delta) {
    if (this.enabled) {
      this.prev.copy(this.position)
      // this.position.addScaledVector(this.direction, this.charge.speed * delta)
      this.position.addScaledVector(this.direction, 5000 * delta)








      // this.ray.origin.copy(this.prev)
      // this.ray.direction.copy(this.direction)
      // const d = this.prev.distanceTo(this.position)
      //
      // this.ray.recast(d)
      // const box = new Box3()
      // box.setFromObject(this.test)
      // const s = this.ray.intersectsBox(box)
      // console.log(s/*, this.prev, this.position*/)

      this.raycaster.ray.origin.copy(this.prev)
      this.raycaster.ray.direction.copy(this.direction)
      this.raycaster.near = 0
      this.raycaster.far = this.prev.distanceTo(this.position)

      // const box = new Box3()
      // box.setFromObject(this.test)
      const s = this.raycaster.intersectObject(this.test)
      if (s.length > 0) {
        console.log(s/*, this.prev, this.position*/)
      }













      const distance = this.start.distanceTo(this.position)
      if (distance >= this.charge.maxDistance) {
        this.enable(false)
        if (this.removeEvent) {
          this.removeEvent()
        }
      }
    }
  }
}

export default ModelCharge
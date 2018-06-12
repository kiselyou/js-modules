import { Object3D, Vector3, Mesh, MeshBasicMaterial, SphereGeometry } from 'three'

class ModelCharge extends Object3D {
  constructor() {
    super()

    /**
     *
     * @type {number}
     */
    this.speed = 300

    /**
     *
     * @type {Vector3}
     */
    this.target = new Vector3()

    /**
     *
     * @type {Vector3}
     */
    this.direction = new Vector3()

    /**
     *
     * @type {boolean}
     */
    this.enabled = false
  }

  /**
   *
   * @returns {ModelCharge}
   */
  buildMesh() {
    const geometry = new SphereGeometry(0.5, 6, 6)
    const material = new MeshBasicMaterial({ color: 0xFF0000 })
    this.add(new Mesh(geometry, material))
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
   * @return {ModelCharge}
   */
  updateDirection() {
    this.direction.copy(this.target)
    this.direction = this.direction.sub(this.position).normalize()
    // this.direction.copy(this.target.sub(this.position).normalize())
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
   * @param {number} delta
   * @returns {void}
   */
  update(delta) {
    if (this.enabled) {
      this.updateDirection()
      this.position.addScaledVector(this.direction, this.speed * delta)
    }
  }
}

export default ModelCharge
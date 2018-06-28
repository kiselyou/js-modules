import { Group, Object3D, Mesh, Box3, Box3Helper } from 'three'

class Model extends Object3D {
  constructor() {
    super()

    /**
     *
     * @type {boolean}
     */
    this.enableIntersect = true

    /**
     *
     * @type {Object3D}
     */
    this.element = new Object3D()
    super.add(this.element)
  }

  /**
   *
   * @param {number} color
   * @returns {Box3Helper}
   */
  getHelperBox(color = 0xffff00) {
    const box = new Box3()
    box.setFromObject(this)
    return new Box3Helper(box, color)
  }

  /**
   *
   * @param {Object3D|Group|Mesh|Gyroscope} obj
   * @returns {Model}
   */
  addToGroup(obj) {
    super.add(obj)
    return this
  }

  /**
   *
   * @param {Object3D|Group|Mesh} obj
   * @returns {Model}
   */
  removeFromGroup(obj) {
    super.remove(obj)
    return this
  }

  /**
   *
   * @param {Mesh|Group|Object3D} element
   */
  add(element) {
    this.element.add(element)
  }

  /**
   *
   * @param {Mesh|Group|Object3D} element
   */
  remove(element) {
    this.element.remove(element)
  }
}

export default Model
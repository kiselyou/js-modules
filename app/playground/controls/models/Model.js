import { Group, Object3D } from 'three'

class Model extends Group {
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
   * @param {Object3D|Group|Mesh} obj
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
import { Group, Object3D, Mesh } from 'three'

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
    this.decoration = new Object3D()
    super.add(this.decoration)
  }

  /**
   *
   * @param {Object3D|Group|Mesh|Gyroscope} obj
   * @returns {Model}
   */
  addToGroup(obj) {
    this.decoration.add(obj)
    return this
  }

  /**
   *
   * @param {Object3D|Group|Mesh} obj
   * @returns {Model}
   */
  removeFromGroup(obj) {
    this.decoration.remove(obj)
    return this
  }
}

export default Model
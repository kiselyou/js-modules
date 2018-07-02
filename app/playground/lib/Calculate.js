import { Vector3 } from 'three'

class Calculate {
  constructor() {
    /**
     *
     * @type {Vector3}
     */
    this.tmp = new Vector3(0, 0, 0)
  }

  /**
   *
   * @param {Object3D|Model} obj
   * @param {number} distance
   * @returns {Vector3}
   */
  getNextPosition(obj, distance) {
    const v = this.getDirection(obj).multiplyScalar(distance)
    return obj.position.clone().add(v)
  }

  /**
   *
   * @param {Object3D|Model} obj
   * @returns {Vector3}
   */
  getDirection(obj) {
    this.tmp.applyQuaternion(obj.quaternion)
    obj.getWorldDirection(this.tmp)
    return this.tmp.clone()
  }

  /**
   *
   * @param {Object3D} parent
   * @param {Object3D} child
   * @returns {Vector3}
   */
  getChildPositionInWorld(parent, child) {
    parent.updateMatrixWorld()
    return this.tmp.setFromMatrixPosition(child.matrixWorld).clone()
  }

  /**
   *
   * @param {Object3D|Model} parent
   * @param {Object3D} element
   * @returns {Vector3}
   */
  getPositionInWorld(parent, element) {
    parent.add(element)
    const startPosition = this.getChildPositionInWorld(parent, element)
    parent.remove(element)
    return startPosition
  }
}

export default Calculate
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
   * @param {Vector3} a
   * @param {Vector3} b
   * @returns {Vector3}
   */
  getVectorDirection(a, b) {
    return this.tmp.copy(b).sub(a).normalize().clone()
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

  /**
   * Расчет упреждения
   *
   * @param {Model} modelTarget
   * @param {Number} modelTargetSpeed
   * @param {Model|Object3D} modelCharge
   * @param {number} modelChargeSpeed
   */
  deflection(modelTarget, modelTargetSpeed, modelCharge, modelChargeSpeed) {
    // Расстояние от выстрела до цели
    const distanceToTarget = modelCharge.position.distanceTo(modelTarget.position)
    // Время полета пули до цели
    const time = distanceToTarget / modelChargeSpeed
    // Направление движения цели
    const direction = this.getDirection(modelTarget)

    this.tmp.setX(modelTargetSpeed * time * direction.x)
    this.tmp.setZ(modelTargetSpeed * time * direction.z)
    this.tmp.add(modelTarget.position)
    return this.tmp.sub(modelCharge.position).clone()
  }
}

export default Calculate
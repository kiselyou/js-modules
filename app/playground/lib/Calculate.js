import { Vector3 } from 'three'

class Calculate {
  constructor() {
    /**
     *
     * @type {Vector3}
     */
    this.tmp = new Vector3(0, 0, 0)

    /**
     *
     * @type {Vector3}
     */
    this.tmpL = new Vector3(0, 0, 0)

    /**
     *
     * @type {Vector3}
     */
    this.tmpR = new Vector3(0, 0, 0)
  }

  /**
   *
   * Calculate points on the sides left and right
   *
   * @param {Vector3} a
   * @param {Vector3} b
   * @param {number} angle
   * @returns {{leftAngle: number, left: number, centerAngle: number, center: number, rightAngle: number, right: number}}
   */
  getTripleDirection(a, b, angle) {
    const r = new Vector3().copy(a).distanceTo(b);
    const x = Math.abs(a.x - b.x);
    const y = Math.abs(a.z - b.z);
    const initialAngle = Math.atan2(y, x);
    const secondAngle = (initialAngle + angle);
    const thirdAngle = (initialAngle - angle);

    // Calculate x2 and y2
    let x2 = r * Math.cos(secondAngle);
    let y2 = r * Math.sin(secondAngle);

    // Calculate x3 and y3
    let x3 = r * Math.cos(thirdAngle);
    let y3 = r * Math.sin(thirdAngle);

    // Verify if X is positive or negative
    if(b.x < a.x) {
      x2 = x2 * -1;
      x3 = x3 * -1;
    }

    // Verify if Y is positive or negative
    if(b.y < a.y) {
      y2 = y2 * -1;
      y3 = y3 * -1;
    }

    return {
      leftAngle: thirdAngle,
      left: this.tmpL.set(a.x + x3, b.y, a.z + y3).clone(),
      centerAngle: initialAngle,
      center: a.clone(),
      rightAngle: secondAngle,
      right: this.tmpR.set(a.x + x2, b.y, a.z + y2).clone()
    }
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

  /**
   *
   * @param {Vector3} center - this is point to calculate angle
   * @param {Vector3} a - point
   * @param {Vector3} b - point
   * @returns {number}
   */
  angleBetween(center, a, b) {
    const v11 = new Vector3().copy(a).sub(center)
    const v22 = new Vector3().copy(b).sub(center)

    const v11mag = v11.length()
    const v11norm = v11.divideScalar(v11mag)

    const v22mag = v22.length()
    const v22norm = v22.divideScalar(v22mag)
    return Math.acos(v11norm.dot(v22norm))
  }
}

export default Calculate
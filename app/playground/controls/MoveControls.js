import { Object3D, Math as TMath } from 'three'

export const FORWARD = 0
export const BACKWARD = 2
export const LEFT = 3
export const RIGHT = 4

class MoveControls {
  constructor() {
    /**
     * This is a current speed of shit
     * possible values
     *  0 - to sop ship
     *  0.01 - to allowed move forward
     *  - 0.01 - to allowed move backward
     *
     * @type {number}
     */
    this.speed = 0.01

    /**
     * This is a max speed of shop. This speed depend on "angularSpeed"
     *
     * @type {number}
     */
    this.maxSpeed = 25

    /**
     * This is a max speed of shop. This speed depend on "angularSpeed"
     *
     * @type {number}
     */
    this.maxReverseSpeed = - 5

    /**
     * Speed of rotation on axis "Y"
     *
     * @type {number}
     */
    this.angularSpeed = 2.5

    /**
     * This is a current angle of ship
     *
     * @type {number}
     */
    this.bodyOrientation = 0

    /**
     *
     * @type {number}
     */
    this.acceleration = 100

    /**
     *
     * @type {number}
     */
    this.deceleration = 100

    /**
     *
     * @type {Object3D}
     */
    this.model = new Object3D()

    /**
     *
     * @type {{left: boolean, right: boolean, forward: boolean, backward: boolean}}
     */
    this.moveActions = {
      left: false,
      right: false,
    }
  }

  /**
   *
   * @param {number} delta
   * @returns {void}
   */
  update(delta) {
    if (this.moveActions.left && this.speed !== 0) {
      this.bodyOrientation += delta * this.angularSpeed
    }

    if (this.moveActions.right && this.speed !== 0) {
      this.bodyOrientation -= delta * this.angularSpeed
    }

    if (this.speed > 0) {
      const k = this.exponentialEaseOut(this.speed / this.maxSpeed)
      this.speed = TMath.clamp(this.speed + k * delta * this.acceleration, 0, this.maxSpeed)
    }

    if (this.speed < 0) {
      const k = this.exponentialEaseOut(this.speed / this.maxReverseSpeed)
      this.speed = TMath.clamp(this.speed - k * delta * this.deceleration, this.maxReverseSpeed, 0)
    }

    let forwardDelta = this.speed * delta
    this.model.position.x += Math.sin(this.bodyOrientation) * forwardDelta
    this.model.position.z += Math.cos(this.bodyOrientation) * forwardDelta
    this.model.rotation.y = this.bodyOrientation
  }

  /**
   *
   * @param {number} k
   * @returns {number}
   */
  exponentialEaseOut(k) {
    return k === 1 ? 1 : - Math.pow(2, - 10 * k) + 1
  }
}

export default MoveControls
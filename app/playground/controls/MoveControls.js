import { Object3D, Math as TMath } from 'three'

export const FORWARD = 'forward'
export const BACKWARD = 'backward'
export const LEFT = 'left'
export const RIGHT = 'right'
export const SLOWDOWN = 'slowdown'

class MoveControls {
  constructor() {
    /**
     * This is a current speed of shit
     *
     * @type {number}
     */
    this.speed = 0

    /**
     * This is a max speed of shop. This speed depend on "angularSpeed"
     *
     * @type {number}
     */
    this.maxSpeed = 85

    /**
     * This is a max speed of shop. This speed depend on "angularSpeed"
     *
     * @type {number}
     */
    this.maxReverseSpeed = - 15

    /**
     * Speed of rotation on axis "Y"
     *
     * @type {number}
     */
    this.angularSpeed = 1.5

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
     * @type {{left: boolean, right: boolean, forward: boolean, backward: boolean, slowdown: boolean}}
     */
    this.moveActions = {
      [LEFT]: false,
      [RIGHT]: false,
      [FORWARD]: false,
      [BACKWARD]: false,
      [SLOWDOWN]: false,
    }

    /**
     *
     * @type {{left: boolean, right: boolean, forward: boolean, backward: boolean, slowdown: boolean}}
     */
    this.prevMoveActions = {
      [LEFT]: false,
      [RIGHT]: false,
      [FORWARD]: false,
      [BACKWARD]: false,
      [SLOWDOWN]: false,
    }

    /**
     *
     * @type {Array}
     */
    this.moveEvents = [(a, b, c) => console.log(a, b, c)]
  }

  /**
   *
   * @param {string} action - This is actions constants
   * @returns {MoveControls}
   * @private
   */
  _listen(action) {
    if (this.moveActions[action] !== this.prevMoveActions[action]) {
      for (const listener of this.moveEvents) {
        listener(action, this.moveActions, this.prevMoveActions)
      }
    }
    return this
  }

  /**
   *
   * @param {boolean} value
   * @returns {MoveControls}
   */
  enableLeft(value) {
    this.prevMoveActions[LEFT] = this.moveActions[LEFT]
    this.moveActions[LEFT] = value
    this._listen(LEFT)
    return this
  }

  /**
   *
   * @param {boolean} value
   * @returns {MoveControls}
   */
  enableRight(value) {
    this.prevMoveActions[RIGHT] = this.moveActions[RIGHT]
    this.moveActions[RIGHT] = value
    this._listen(RIGHT)
    return this
  }

  /**
   *
   * @param {boolean} value
   * @returns {MoveControls}
   */
  enableForward(value) {
    this.prevMoveActions[FORWARD] = this.moveActions[FORWARD]
    this.moveActions[FORWARD] = value
    this._listen(FORWARD)
    return this
  }

  /**
   *
   * @param {boolean} value
   * @returns {MoveControls}
   */
  enableBackward(value) {
    this.prevMoveActions[BACKWARD] = this.moveActions[BACKWARD]
    this.moveActions[BACKWARD] = value
    this._listen(BACKWARD)
    return this
  }

  /**
   *
   * @param {boolean} value
   * @returns {MoveControls}
   */
  enableSlowdown(value) {
    this.prevMoveActions[SLOWDOWN] = this.moveActions[SLOWDOWN]
    this.moveActions[SLOWDOWN] = value
    this._listen(SLOWDOWN)
    return this
  }

  /**
   *
   * @param {number} delta
   * @returns {void}
   */
  update(delta) {
    const isLeft = this.moveActions[LEFT]
    const isRight = this.moveActions[RIGHT]
    const isForward = this.moveActions[FORWARD]
    const isBackward = this.moveActions[BACKWARD]

    if (isLeft) {
      if (isBackward && this.speed < 0) {
        this.bodyOrientation -= delta * this.angularSpeed
      } else if (!isBackward) {
        this.bodyOrientation += delta * this.angularSpeed
      }
    }

    if (isRight) {
      if (isBackward && this.speed < 0) {
        this.bodyOrientation += delta * this.angularSpeed
      } else if (!isBackward) {
        this.bodyOrientation -= delta * this.angularSpeed
      }
    }

    if (isForward) {
      this.speed = TMath.clamp(this.speed + delta * this.acceleration, this.maxReverseSpeed, this.maxSpeed)
    }

    if (isBackward) {
      this.speed = TMath.clamp(this.speed - delta * this.deceleration, this.maxReverseSpeed, this.maxSpeed)
    }

    if (this.moveActions[SLOWDOWN]) {
      if ( this.speed > 0 ) {
        const k = this.exponentialEaseOut(this.speed / this.maxSpeed)
        this.speed = TMath.clamp(this.speed - k * delta * this.deceleration, 0, this.maxSpeed)
      } else {
        const k = this.exponentialEaseOut(this.speed / this.maxReverseSpeed)
        this.speed = TMath.clamp(this.speed + k * delta * this.deceleration, this.maxReverseSpeed, 0)
      }
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
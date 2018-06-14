import { Object3D, Mesh, Math as TMath } from 'three'
import Engine from '@entity/particles-spaceship/Engine'
import Spaceship from '@entity/particles-spaceship/Spaceship'
import Model from './models/Model'

export const FORWARD = 'forward'
export const BACKWARD = 'backward'
export const LEFT = 'left'
export const RIGHT = 'right'
export const SLOWDOWN = 'slowdown'

class MoveControls extends Object3D {
  constructor() {
    super()

    /**
     *
     * @type {Spaceship}
     */
    this.spaceship = new Spaceship()

    /**
     *
     * @type {Engine|?}
     */
    this.engine = null

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
     * @type {Array.<moveActionCallback>}
     */
    this.moveEvents = []
  }

  /**
   *
   * @returns {void}
   */
  async beforeStart() {
    this.engine = this.spaceship.getEngine()
  }

  /**
   * @param {Object} moveSwapInfo
   * @param {string} action
   * @callback moveActionCallback
   */

  /**
   * Следит за действиями игрока с кораблем
   *
   * @param {moveActionCallback} callback
   * @return {MoveControls}
   */
  addMoveEventListener(callback) {
    this.moveEvents.push(callback)
    return this
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
        listener(this.getMoveSwapInfo(), action)
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
      if (isBackward && this.engine.speed < 0) {
        this.engine.bodyOrientation -= delta * this.engine.angularSpeed
      } else if (!isBackward) {
        this.engine.bodyOrientation += delta * this.engine.angularSpeed
      }
    }

    if (isRight) {
      if (isBackward && this.engine.speed < 0) {
        this.engine.bodyOrientation += delta * this.engine.angularSpeed
      } else if (!isBackward) {
        this.engine.bodyOrientation -= delta * this.engine.angularSpeed
      }
    }

    if (isForward) {
      this.engine.speed = TMath.clamp(this.engine.speed + delta * this.engine.acceleration, this.engine.maxReverseSpeed, this.engine.maxSpeed)
    }

    if (isBackward) {
      this.engine.speed = TMath.clamp(this.engine.speed - delta * this.engine.deceleration, this.engine.maxReverseSpeed, this.engine.maxSpeed)
    }

    if (this.moveActions[SLOWDOWN]) {
      if ( this.engine.speed > 0 ) {
        const k = this.exponentialEaseOut(this.engine.speed / this.engine.maxSpeed)
        this.engine.speed = TMath.clamp(this.engine.speed - k * delta * this.engine.deceleration, 0, this.engine.maxSpeed)
      } else {
        const k = this.exponentialEaseOut(this.engine.speed / this.engine.maxReverseSpeed)
        this.engine.speed = TMath.clamp(this.engine.speed + k * delta * this.engine.deceleration, this.engine.maxReverseSpeed, 0)
      }
    }

    let forwardDelta = this.engine.speed * delta
    this.position.x += Math.sin(this.engine.bodyOrientation) * forwardDelta
    this.position.z += Math.cos(this.engine.bodyOrientation) * forwardDelta
    this.rotation.y = this.engine.bodyOrientation
  }

  /**
   *
   * @param {number} k
   * @returns {number}
   */
  exponentialEaseOut(k) {
    return k === 1 ? 1 : - Math.pow(2, - 10 * k) + 1
  }

  /**
   *
   * @param {Object} data - this is value from "this.getSwapInfo()"
   * @return {MoveControls}
   */
  setMoveSwapInfo(data) {
    for (const property in data) {
      if (data.hasOwnProperty(property)) {
        switch (property) {
          case 'moveActions':
            const moveActions = data[property]
            this.enableLeft(moveActions[LEFT])
            this.enableRight(moveActions[RIGHT])
            this.enableForward(moveActions[FORWARD])
            this.enableBackward(moveActions[BACKWARD])
            this.enableSlowdown(moveActions[SLOWDOWN])
            break
          case 'engine':
            this.engine.setSwapInfo(data[property])
            break
          case 'position':
          case 'rotation':
            this[property].copy(data[property])
            break
          default:
            this[property] = data[property]
            break
        }
      }
    }
    return this
  }

  /**
   *
   * @returns {Object}
   */
  getMoveSwapInfo() {
    const data = {}
    const properties = [
      'moveActions',
      'prevMoveActions',
      'engine',
      'position',
      'rotation'
    ]
    for (const property of properties) {
      switch (property) {
        case 'engine':
          data['engine'] = this.engine.getSwapInfo()
          break
        default:
          data[property] = this[property]
          break
      }
    }
    return data
  }
}

export default MoveControls
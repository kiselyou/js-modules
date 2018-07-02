import { Math as TMath } from 'three'
import Spaceship from '@entity/particles-spaceship/Spaceship'
import Model from './models/Model'

export const FORWARD = 'forward'
export const BACKWARD = 'backward'
export const LEFT = 'left'
export const RIGHT = 'right'
export const SLOWDOWN = 'slowdown'

class MoveControls {
  /**
   *
   * @param {Model} model
   * @param {Spaceship} spaceship
   */
  constructor(model, spaceship) {
    /**
     *
     * @type {Model}
     */
    this.model = model

    /**
     *
     * @type {Spaceship}
     */
    this.spaceship = spaceship

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
    // this.engine = this.spaceship.getEngine()
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
   * @param {Engine} engine
   */
  updateIncline(engine) {
    const isLeft = this.moveActions[LEFT]
    const isRight = this.moveActions[RIGHT]
    const isBackward = this.moveActions[BACKWARD]
    const isSlowDown = this.moveActions[SLOWDOWN]

    // Одновременно нажиты клавиши "лево" и "право"
    if (isLeft && isRight) {
      return
    }

    const speedShip = (engine.speed / engine.maxSpeed)
    let speed = speedShip * engine.inclineSpeed / 1000

    const currentAngle = this.model.rotation.z
    const maxLeftAngle = - (engine.maxInclineAngle + speed)
    const maxRightAngle = + (engine.maxInclineAngle - speed)

    // движение назад, торможение, замедление
    if (isBackward || isSlowDown || engine.speed <= 0) {
      speed = Math.abs(speed)
      if (currentAngle <= - speed) {
        this.model.rotation.z += speed
      }
      if (currentAngle >= speed) {
        this.model.rotation.z -= speed
      }
      if (currentAngle > - speed && currentAngle < speed) {
        this.model.rotation.z = 0
      }
      return
    }

    if (isLeft && currentAngle > maxLeftAngle) {
      this.model.rotation.z -= speed
    }

    if (isRight && currentAngle < maxRightAngle) {
      this.model.rotation.z += speed
    }

    if (!isLeft && !isRight) {
      if (currentAngle < - speed) {
        this.model.rotation.z += speed * 2
      }

      if (currentAngle > speed) {
        this.model.rotation.z -= speed * 2
      }

      if (currentAngle >= - speed && currentAngle <= speed) {
        this.model.rotation.z = 0
      }
    }
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

    const engine = this.spaceship.getEngine()

    if (isLeft) {
      if (isBackward && engine.speed < 0) {
        engine.bodyOrientation -= delta * engine.angularSpeed
      } else if (!isBackward) {
        engine.bodyOrientation += delta * engine.angularSpeed
      }
    }

    if (isRight) {
      if (isBackward && engine.speed < 0) {
        engine.bodyOrientation += delta * engine.angularSpeed
      } else if (!isBackward) {
        engine.bodyOrientation -= delta * engine.angularSpeed
      }
    }

    if (isForward) {
      engine.speed = TMath.clamp(engine.speed + delta * engine.acceleration, engine.maxReverseSpeed, engine.maxSpeed)
    }

    if (isBackward) {
      engine.speed = TMath.clamp(engine.speed - delta * engine.deceleration, engine.maxReverseSpeed, engine.maxSpeed)
    }

    if (this.moveActions[SLOWDOWN]) {
      if ( engine.speed > 0 ) {
        const k = this.exponentialEaseOut(engine.speed / engine.maxSpeed)
        engine.speed = TMath.clamp(engine.speed - k * delta * engine.deceleration, 0, engine.maxSpeed)
      } else {
        const k = this.exponentialEaseOut(engine.speed / engine.maxReverseSpeed)
        engine.speed = TMath.clamp(engine.speed + k * delta * engine.deceleration, engine.maxReverseSpeed, 0)
      }
    }

    this.updateIncline(engine)

    let forwardDelta = engine.speed * delta
    this.model.position.x += Math.sin(engine.bodyOrientation) * forwardDelta
    this.model.position.z += Math.cos(engine.bodyOrientation) * forwardDelta
    this.model.rotation.y = engine.bodyOrientation
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
            const engine = this.spaceship.getEngine()
            engine.setSwapInfo(data[property])
            break
          case 'position':
          case 'rotation':
            this.model[property].copy(data[property])
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
          data['engine'] = this.spaceship.getEngine().getSwapInfo()
          break
        case 'position':
        case 'rotation':
          data[property] = this.model[property]
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
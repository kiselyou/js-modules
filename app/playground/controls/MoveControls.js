import { Math as TMath, Quaternion, Vector3 } from 'three'
import Spaceship from '@entity/particles-spaceship/Spaceship'
import Model from './models/Model'
import CANNON from 'cannon'

export const FORWARD = 'forward'
export const BACKWARD = 'backward'
export const LEFT = 'left'
export const RIGHT = 'right'
export const SLOWDOWN = 'slowdown'
export const SWAP_AUTO_UPDATE = 'swap-auto-update'

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

    /**
     *
     * @type {Vector3}
     */
    this.lastPosition = new Vector3()

    /**
     *
     * @type {?|string}
     */
    this.swapIntervalId = null

    /**
     *
     * @type {Vector3}
     */
    this.velocity = new Vector3(0, 0, 0)

    /**
     *
     * @type {Vector3}
     */
    this.vectorTmp = new Vector3(0, 1, 0)
  }

  /**
   *
   * @returns {void}
   */
  async beforeStart() {

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
   * @param {string} action possible values 'shell'|'energy'
   * @callback collideEvent
   */

  /**
   *
   * @param {collideEvent} callback
   * @returns {MoveControls}
   */
  onCollide(callback) {
    this.model.boxBody.addEventListener('collide', (event) => {
      if (!event.body.parent) {
        return
      }
      const kBase = .0002;
      const engine = this.spaceship.getEngine()
      const v1 = engine.speed
      const m1 = this.spaceship.mass;
      const kl1 = this.spaceship.coefficientReduceDomage;
      const kh1 = this.spaceship.coefficientIncraceDomage;


      const reference = event.body.parent.reference
      const v2 = 0
      const m2 = reference.mass
      const kl2 = reference.coefficientReduceDomage;
      const kh2 = reference.coefficientIncraceDomage;

      const d1 = kBase * (m2 * ((v1 + v2) * (v1 + v2))) / 2 * (kh2 - kl1);

      console.log(`kBase = ${kBase};`)
      console.log(`m2 = ${m2};`)
      console.log(`v1 = ${v1};`)
      console.log(`v2 = ${v2};`)
      console.log(`kh2 = ${kh2};`)
      console.log(`kl1 = ${kl1};`)
      console.log(`d1 = ${d1};`)


      // console.log(this.model.boxBody.position, this.model.boxBody.previousPosition,
      //   this.model.boxBody.previousPosition.distanceTo(this.model.boxBody.position) / this.model.boxBody.world.dt)

      // setTimeout(() => {
      //   // console.log(this.model.boxBody.position, this.model.boxBody.previousPosition,
      //   //   this.model.boxBody.previousPosition.distanceTo(this.model.boxBody.position) / this.model.boxBody.world.dt)
      //   engine.speed = - Math.abs(this.model.boxBody.previousPosition.distanceTo(this.model.boxBody.position) / this.model.boxBody.world.dt)
      // }, 1 / 120)

      // const d2 = kBase * (m1 * ((v1 + v2) * (v1 + v2))) / 2 * (kh1 - kl2);






      // var velocity = new CANNON.Vec3();
      // worldForward.y = 0; // don't need up velocity, so clamp it
      // worldForward.normalize();
      // worldForward.scale(speed, velocity);


      const groupEnergy = this.spaceship.getGroupEnergy()
      const shell = this.spaceship.getShell()


      setTimeout(() => {

        const speed = this.model.boxBody.previousPosition.distanceTo(this.model.boxBody.position) / this.model.boxBody.world.dt

        console.log(- speed)

        // engine.speed = - speed
        engine.speed = 0

      }, 1 / 60)

      shell.reduce(d1, () => {
        console.log('shell reduce ---')
        callback('shell')
      })
      groupEnergy.reduceShipEnergy(d1, () => {
        console.log('energy reduce ---')
        callback('energy')
      })

      this.swapUpdate('collide')
    });
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
      this.swapUpdate(action)
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
    if (isSlowDown || isBackward) {
      speed = 2 * engine.inclineSpeed / 1000
    }

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
    this.model.updateModel()


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

    this.velocity.x = Math.sin(engine.bodyOrientation) * forwardDelta
    this.velocity.z = Math.cos(engine.bodyOrientation) * forwardDelta

    this.model.position.add(this.velocity)
    // this.model.position.x += Math.sin(engine.bodyOrientation) * forwardDelta
    // this.model.position.z += Math.cos(engine.bodyOrientation) * forwardDelta
    // this.model.boxBody.position.y = 0

    this.model.quaternion.setFromAxisAngle(this.vectorTmp, engine.bodyOrientation)

    // this.model.quaternion.copy(this.model.boxBody.quaternion)
    // this.model.position.copy(this.model.boxBody.position)

    if (engine.speed > 0 || this.moveActions[SLOWDOWN]) {
      this.model.boxBody.velocity.set(0, 0, 0);
    }

    // this.model.boxBody.velocity.set(Math.sin(engine.bodyOrientation) * forwardDelta, 0, Math.cos(engine.bodyOrientation) * forwardDelta);

    // this.model.position.x += Math.sin(engine.bodyOrientation) * forwardDelta
    // this.model.position.z += Math.cos(engine.bodyOrientation) * forwardDelta
    // this.model.rotation.y = engine.bodyOrientation

    this.model.updateBody()
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
   * Swap info if speed is 0 but collide and ship is moving to some side.
   *
   * @returns {MoveControls}
   */
  swapAutoUpdate() {
    if (this.swapIntervalId) {
      clearInterval(this.swapIntervalId)
    }

    const engine = this.spaceship.getEngine()
    this.lastPosition.copy(this.model.boxBody.position)
    this.swapIntervalId = setInterval(() => {
      if (engine.speed === 0 && !this.lastPosition.equals(this.model.boxBody.position)) {
        this.lastPosition.copy(this.model.boxBody.position)
        this.swapUpdate(SWAP_AUTO_UPDATE)
      }
    }, 1000 / 10)
    return this
  }

  /**
   *
   * @param {string} action - constants of current class
   * @returns {MoveControls}
   */
  swapUpdate(action) {
    for (const listener of this.moveEvents) {
      listener(this.getMoveSwapInfo(), action)
    }
    return this
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
          case 'rotation':
            this.model[property].copy(data[property])
            break
          case 'position':
            this.model[property].copy(data[property])
            this.model.boxBody[property].copy(data[property])
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
      'rotation',
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
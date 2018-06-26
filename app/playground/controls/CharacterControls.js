import ModelSpaceship from './models/spaceship/ModelSpaceship'
import Calculate from './../lib/Calculate'
import RaceControls from './RaceControls'
import ShotControls from './ShotControls'
import ParticlePlayGround from '@entity/ParticlePlayGround'
import Player from '@entity/particles-sector/Player'
import UserPanel from '@app/playground/decoration/UserPanel'
import Model from '@app/playground/controls/models/Model'

import { Mesh, CubeGeometry, MeshBasicMaterial } from 'three'

class CharacterControls extends ModelSpaceship {
  /**
   *
   * @param {Scene} scene
   * @param {Loader} loader
   */
  constructor(scene, loader) {
    super(scene, loader)

    /**
     *
     * @type {RaceControls}
     */
    this.raceControls = new RaceControls()

    /**
     *
     * @type {ShotControls}
     */
    this.shotControls = new ShotControls(this)

    /**
     * @type {UserPanel}
     */
    this.userPanel = new UserPanel(this)

    /**
     *
     * @type {Calculate}
     */
    this.calculate = new Calculate()

    /**
     *
     * @type {Player}
     */
    this.player = new Player()

    /**
     *
     * @type {boolean}
     */
    this.enabled = false

    /**
     *
     * @type {Array.<Slot>}
     */
    this.selectedSlots = []

    this.tets = []
  }

  /**
   *
   * @returns {Array.<Model>}
   */
  getModelsFromScene() {
    const models = []
    for (const element of this.scene.children) {
      if (element instanceof Model) {
        models.push(element.element.children[0])
        // models.push(element.children[0])
      }
    }
    return models
  }

  /**
   * Get position of aim in world
   *
   * @returns {Vector3}
   */
  getTargetPosition() {
    return this.calculate.getNextPosition(this.model, this.aim.position.z)
  }

  /**
   * Get ships direction
   *
   * @returns {Vector3}
   */
  getDirection() {
    return this.calculate.getDirection(this.model)
  }

  /**
   * Get angle of current model to target
   *
   * @param {Vector3} target
   * @returns {number}
   */
  getAngleTo(target) {
    const direction = this.getDirection()
    return direction.angleTo(target)
  }

  /**
   *
   * @returns {Promise<void>}
   */
  async buildPanel() {
    await this.userPanel.drawMainPanel()
    await this.userPanel.drawShotPanel()
    await this.userPanel.drawSpeedPanel()
  }

  /**
   * @returns {void}
   */
  async beforeStart() {
    await super.beforeStart()
    await this.raceControls.beforeStart()
    await this.shotControls.beforeStart()
    this.model.position.copy(this.player.position)
    this.enabled = true
  }

  /**
   *
   * @param {Player|Object} data
   * @returns {CharacterControls}
   */
  copyPlayer(data) {
    this.player.copy(data)
    return this
  }

  /**
   * Before call this method - Player must be set
   *
   * @param {ParticlePlayGround} data
   * @returns {ModelSpaceship}
   */
  copy(data) {
    super.copy(data)
    this.spaceship.copy(data.getPlayerSpaceship(this.player))
    return this
  }

  /**
   *
   * @param {number} delta
   * @returns {void}
   */
  update(delta) {
    if (this.enabled) {
      super.update(delta)
      this.shotControls.update(delta)
      this.player.position.copy(this.model.position)
    }
  }

  /**
   *
   * @param {Intersect} intersect
   * @param {MouseEvent} mouseEvent
   * @returns {void}
   */
  updateTooltip(intersect, mouseEvent) {

  }

  /**
   *
   * @param {MouseEvent} mouseEvent
   * @returns {void}
   */
  panelMouseClick(mouseEvent) {
    this.userPanel.panelShot.onMouseClick(mouseEvent, (slot, shape) => {
      if (shape.attr.isActive) {
        this.selectedSlots.push(slot)
      } else {
        for (let i = 0; i < this.selectedSlots.length; i++) {
          const selectedSlot = this.selectedSlots[i]
          if (selectedSlot.id === slot.id) {
            this.selectedSlots.splice(i, 1)
          }
        }
      }
    })
  }

  /**
   *
   * @param {Intersect} intersect
   * @param {MouseEvent} mouseEvent
   * @returns {void}
   */
  onMouseClick(intersect, mouseEvent) {
    if (this.selectedSlots.length > 0) {
      const models = this.getModelsFromScene()
      const intersectedObjects = intersect.findIntersection(models, true)
      console.log(intersectedObjects)
    }




    // this.shotControls.onMouseClick(intersect, mouseEvent)


    // const target = this.getTargetPosition()
    // //TODO: temp solution
    // const guns = this.spaceship.getSlotsByType(Slot.TYPE_GUN)
    // for (const gun of guns) {
    //   this.shotControls.shot(gun.id, target)
    // }
  }
}

export default CharacterControls
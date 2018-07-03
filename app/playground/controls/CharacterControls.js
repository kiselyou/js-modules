import ModelSpaceship from './models/spaceship/ModelSpaceship'
import Calculate from './../lib/Calculate'
import RaceControls from './RaceControls'
import ShotControls from './ShotControls'
import ParticlePlayGround from '@entity/ParticlePlayGround'
import Player from '@entity/particles-sector/Player'
import UserPanel from '@app/playground/decoration/UserPanel'
import Model from '@app/playground/controls/models/Model'

import Slot from '@entity/particles-spaceship/Slot'
import ModelTarget from './models/charge/ModelTarget'
import { Vector3 } from 'three'

class CharacterControls extends ModelSpaceship {
  /**
   *
   * @param {Playground} playground
   */
  constructor(playground) {
    super(playground)

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

    /**
     *
     * @type {Array.<ModelTarget>}
     */
    this.targets = []
  }

  /**
   *
   * @param {Model} model
   * @returns {?CharacterControls}
   */
  findCharacterControlsByModel(model) {
    const controls = this.playground.playersControls.find((controls) => {
      return controls.model.uuid === model.uuid
    })
    return controls || null
  }

  /**
   *
   * @returns {Array.<Model>}
   */
  getModelsFromScene(excludeCurrent = true) {
    const models = []
    for (const element of this.scene.children) {
      if (element instanceof Model) {
        if (element.id === this.model.id && excludeCurrent) {
          continue
        }
        models.push(element)
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
    return this.calculate.getNextPosition(this.model, 150)
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
   * Удалить слоты из списка выбранных.
   *
   * @param {Slot} slot
   * @returns {CharacterControls}
   */
  removeSelectedSlot(slot) {
    const index = this.selectedSlots.indexOf(slot)
    if (index >= 0) {
      this.selectedSlots.splice(index, 1)
    }
    return this
  }

  /**
   * Назначить слот (оружие) на цель.
   * Есть разичные слоты и у каждого свое назанчение.
   * Каждые слот можно идентифицировать по назначению.
   * Например сущность Gun может быть в слоте со значением свойства Slot.type равным Slot.TYPE_GUN
   *
   * @param {Array.<Slot>} slots
   * @param {Model} model
   * @returns {CharacterControls}
   */
  async assignSlotOnTarget(slots, model) {
    for (const slot of slots) {
      slot.setStatus(Slot.STATUS_ACTIVE)
    }

    let modelTarget = this.targets.find((modelTarget) => {
      return modelTarget.model.id === model.id
    })

    if (modelTarget) {
      // Если цель выбрана нужно обновить слоты и перегенерить цель
      await modelTarget.addSlots(slots).draw()
    } else {
      // Создать и запомнить цель
      const modelTarget = await new ModelTarget(model, slots).draw()
      this.targets.push(modelTarget)
    }
    return this
  }

  /**
   * Событие клика по панели "выбора оружия".
   *
   * @param {MouseEvent} mouseEvent
   * @param {string} mouseButton - 'left'|'right'
   * @returns {void}
   */
  panelMouseClick(mouseEvent, mouseButton) {
    this.userPanel.panelShot.onMouseClick(mouseEvent, async (slot) => {
      if (this.selectedSlots.indexOf(slot) === -1 && mouseButton === 'left') {
        slot.setStatus(Slot.STATUS_SELECTED)
        this.selectedSlots.push(slot)
      } else {
        slot.setStatus(Slot.STATUS_ENABLED)
        this.removeSelectedSlot(slot)
      }
      for (const modelTarget of this.targets) {
        await modelTarget.removeSlot(slot).draw()
      }
    })
  }

  /**
   * Событие клика по карте.
   *
   * @param {Intersect} intersect
   * @param {MouseEvent} mouseEvent
   * @returns {void}
   */
  onMouseClick(intersect, mouseEvent) {
    let shotEnabled = true
    if (this.selectedSlots.length > 0) {
      const models = this.getModelsFromScene()
      const intersectedObjects = intersect.findIntersectionModels(models, true)
      if (intersectedObjects.length > 0) {
        shotEnabled = false
        this.assignSlotOnTarget(this.selectedSlots, intersectedObjects[0])
        this.selectedSlots = []
      }
    }

    if (shotEnabled) {
      this.eachSlot((slot, target) => {
        const spendEnergy = slot.particle.energy
        const energy = this.getEnergy()
        if (energy.isEnergy(spendEnergy)) {
          energy.reduce(spendEnergy)
          this.shotControls.shot(slot, target.model)
          this.userPanel.panelIndicator.update()
        } else {
          // TODO нет энергии делаем что-то
        }
      })
    }
  }

  /**
   * @param {Slot} slot
   * @param {ModelTarget} target
   * @callback eachSlotCallback
   */

  /**
   *
   * @param {eachSlotCallback} callback
   * @returns {CharacterControls}
   */
  eachSlot(callback) {
    for (const target of this.targets) {
      for (const slot of target.slots) {
        callback(slot, target)
      }
    }
    return this
  }
}

export default CharacterControls
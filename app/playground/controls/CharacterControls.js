import ModelSpaceship from './models/spaceship/ModelSpaceship'
import Calculate from './../lib/Calculate'
import RaceControls from './RaceControls'
import ShotControls from './ShotControls'

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
  findCharacter(model) {
    if (!model) {
      return null
    }
    if (model.name === this.model.name) {
      return this
    }
    if (model.name === this.playground.character.model.name) {
      return this.playground.character
    }
    const controls = this.playground.playersControls.find((controls) => {
      return model && model.name === controls.model.name
    })

    return controls || null
  }

  /**
   *
   * @returns {Array.<Model>}
   */
  getModels(excludeCurrent = true, maxDistance = 3000) {
    const models = []
    for (const element of this.scene.children) {
      if (element instanceof Model) {
        if (element.id === this.model.id && excludeCurrent) {
          continue
        }

        const distance = element.position.distanceTo(this.model.position)
        if (distance < maxDistance) {
          models.push(element)
        }
      }
    }
    return models
  }

  /**
   *
   * @param {string} name
   * @returns {?Model}
   */
  findModelByName(name) {
    return this.scene.children.find((model) => model.name === name) || null
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
   * @returns {CharacterControls}
   */
  buildPanel() {
    this.userPanel.draw()
    return this
  }

  /**
   * @returns {void}
   */
  async beforeStart() {
    await super.beforeStart()
    await this.raceControls.beforeStart()
    await this.shotControls.beforeStart()
    this.enabled = true
  }

  /**
   *
   * @param {number} delta
   * @returns {void}
   */
  update(delta) {
    if (this.enabled) {
      super.update(delta)
      super.restoreShell(delta, () => {
        // Обновить индикаторы брони корпуса
        this.userPanel.panelIndicator.update([1])
      })
      super.restoreEnergy(delta, () => {
        // Обновить индикаторы енергии
        this.userPanel.panelIndicator.update([2, 3])
      })
    }
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
  assignSlotOnTarget(slots, model) {
    for (const slot of slots) {
      slot.setStatus(Slot.STATUS_ACTIVE)
    }

    let modelTarget = this.targets.find((modelTarget) => {
      return modelTarget.model.id === model.id
    })

    if (modelTarget) {
      // Если цель выбрана нужно обновить слоты и перегенерить цель
      modelTarget.addSlots(slots).draw()
    } else {
      // Создать и запомнить цель
      const modelTarget = new ModelTarget(model, slots).draw()
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
    this.userPanel.panelShot.onMouseClick(mouseEvent, (slot) => {
      if (this.selectedSlots.indexOf(slot) === -1 && mouseButton === 'left') {
        slot.setStatus(Slot.STATUS_SELECTED)
        this.selectedSlots.push(slot)
      } else {
        slot.setStatus(Slot.STATUS_ENABLED)
        this.removeSelectedSlot(slot)
      }
      for (const modelTarget of this.targets) {
        modelTarget.removeSlot(slot).draw()
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
  onLeftMouseClick(intersect, mouseEvent) {
    let shotEnabled = true
    if (this.selectedSlots.length > 0) {
      const models = this.getModels()
      const intersectedObjects = intersect.findIntersection(models)
      if (intersectedObjects.length > 0) {
        shotEnabled = false
        this.assignSlotOnTarget(this.selectedSlots, intersectedObjects[0]['object'])
        this.selectedSlots = []
      }
    }

    if (shotEnabled) {
      this.eachSlot((slot, target) => {
        const spendEnergy = slot.particle.energy

        const gunEnergy = this.getGunEnergy()
        if (gunEnergy.isEnergy(spendEnergy)) {
          const groupEnergy = this.getGroupEnergy()
          groupEnergy.reduceGunEnergy(spendEnergy)
          this.shotControls.shot(slot, target.model)
          this.userPanel.panelIndicator.update([3])
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
import ModelSpaceship from './models/spaceship/ModelSpaceship'

import RaceControls from './RaceControls'
import ShotControls from './ShotControls'

import UserPanel from '@app/playground/decoration/UserPanel'
import Model from '@app/playground/controls/models/Model'

import Slot from '@entity/particles-spaceship/Slot'
import ModelTarget from './models/charge/ModelTarget'
import TooltipShot from '@app/playground/decoration/html/TooltipShot'
import ModelStation from "@app/playground/controls/models/station/ModelStation";
import ModelAsteroid from "@app/playground/controls/models/asteroid/ModelAsteroid";

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

    /**
     *
     * @type {Array.<TooltipShot|Tooltip>}
     */
    this.tooltips = []
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
  getModels(excludeCurrent = true, maxDistance = 15000) {
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
    this.enabled = true
  }

  /**
   *
   * @param {number} delta
   * @returns {CharacterControls}
   */
  updatePanel(delta) {
    if ( ! this.enabled) {
      return this
    }
    super.restoreShell(delta, () => {
      // Обновить индикаторы брони корпуса
      this.userPanel.panelIndicator.update([1])
    })
    super.restoreEnergy(delta, () => {
      // Обновить индикаторы енергии
      this.userPanel.panelIndicator.update([2, 3])
    })
    super.rechargeGuns(delta, (gun) => {
      this.userPanel.panelShot.rebuild(gun)
    })

    this.userPanel.update()
    return this
  }

  /**
   *
   * @param {number} delta
   * @returns {CharacterControls}
   */
  updateTooltipTarget(delta) {
    if ( ! this.enabled) {
      return this
    }
    for (const tooltip of this.tooltips) {
      tooltip.update(delta)
    }
    return this
  }

  /**
   *
   * @param {number} delta
   * @returns {CharacterControls}
   */
  update(delta) {
    if (this.enabled) {
      super.update(delta)
      this.shotControls.update(delta)
    }
    return this
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

    let modelTarget = this.tooltips.find((tooltip) => {
      return tooltip.target.id === model.id
    })

    if (modelTarget) {
      // Если цель выбрана нужно обновить слоты и перегенерить цель
      modelTarget.setSlots(slots).redraw()
    } else {
      // Создать и запомнить цель
      this.tooltips.push(
        new TooltipShot(this.playground)
          .setSlots(slots)
          .setTarget(model)
          .draw()
      )
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
      for (const tooltip of this.tooltips) {
        tooltip.removeSlot(slot).redraw()
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
      this.eachTooltip((slot, tooltip) => {
        if (!slot.particle.isRecharged()) {
          return
        }

        const gunEnergy = this.getGunEnergy()
        if (!gunEnergy.isEnergy(slot.particle.energy)) {
          return
        }

        const groupEnergy = this.getGroupEnergy()
        groupEnergy.reduceGunEnergy(slot.particle.energy)
        this.shotControls.shot(slot, tooltip.target)
        this.userPanel.panelIndicator.update([3])
        slot.particle.discharge()
      })
    }
  }

  /**
   * @param {Slot} slot
   * @param {TooltipShot} target
   * @callback eachTooltipCallback
   */

  /**
   *
   * @param {eachTooltipCallback} callback
   * @returns {CharacterControls}
   */
  eachTooltip(callback) {
    for (const tooltip of this.tooltips) {
      for (const slot of tooltip.slots) {
        callback(slot, tooltip)
      }
    }
    return this
  }

  /**
   *
   * @returns {CharacterControls}
   */
  initCollideEvent() {
    this.addEventListener('collide', (e) => {
      const kBase = .0002;
      const engine = this.spaceship.getEngine()
      const v1 = engine.speed
      const m1 = this.spaceship.mass;
      const kl1 = this.spaceship.coefficientReduceDomage;
      const kh1 = this.spaceship.coefficientIncraceDomage;


      const reference = e.body.parent.reference
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


      // const d2 = kBase * (m1 * ((v1 + v2) * (v1 + v2))) / 2 * (kh1 - kl2);







      const groupEnergy = this.spaceship.getGroupEnergy()
      const shell = this.spaceship.getShell()
      engine.lock()
      shell.reduce(d1, () => {
        console.log('shell reduce')
        this.userPanel.panelIndicator.update([1])
      })
      groupEnergy.reduceShipEnergy(d1, () => {
        console.log('energy reduce')
        this.userPanel.panelIndicator.update([2])
      })


    })
    return this
  }
}

export default CharacterControls
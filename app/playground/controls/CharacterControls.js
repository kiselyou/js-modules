import ModelSpaceship from './models/spaceship/ModelSpaceship'
import Calculate from './../lib/Calculate'
import RaceControls from './RaceControls'
import ShotControls from './ShotControls'
import ParticlePlayGround from '@entity/ParticlePlayGround'
import Player from '@entity/particles-sector/Player'
import UserPanel from '@app/playground/decoration/UserPanel'
import Model from '@app/playground/controls/models/Model'

import Shape from './../decoration/canvas/Shape'

import { Mesh, CubeGeometry, MeshBasicMaterial, SpriteMaterial, Sprite, CanvasTexture, Box3, Box3Helper } from 'three'
import DetectObject3D from "@helper/DetectObject3D";

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

    /**
     *
     * @type {Array.<{slot: Slot, target: Mesh}>}
     */
    this.target = []

    /**
     *
     * @type {HTMLCanvasElement}
     */
    this.canvas = document.createElement('canvas')
    this.canvas.height = 512
    this.canvas.width = 512
    this.shapeTarget = new Shape(this.canvas)

    setTimeout(() => {
      for (const model of this.scene.children) {
        if (model instanceof Model) {
          this.scene.add(model.getHelperBox())
        }
      }
    }, 2000)
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
        this.removeSelectedSlot(slot.id)
      }
    })
  }

  /**
   * Remove slot from selected slots by Slot id
   *
   * @param {string} id
   * @returns {CharacterControls}
   */
  removeSelectedSlot(id) {
    for (let i = 0; i < this.selectedSlots.length; i++) {
      const selectedSlot = this.selectedSlots[i]
      if (selectedSlot.id === id) {
        this.selectedSlots.splice(i, 1)
      }
    }
    return this
  }

  /**
   * Remove target slot by Slot id
   *
   * @param {string} id
   * @returns {CharacterControls}
   */
  removeTargetSlot(id) {
    for (let i = 0; i < this.target.length; i++) {
      const targetSlot = this.target[i]
      if (targetSlot.id === id) {
        this.target.splice(i, 1)
      }
    }
    return this
  }

  /**
   * @typedef {{distance: number, face: Face3, faceIndex: number, object: Mesh, point: Vector3}} selectedTarget
   */

  /**
   * Есть разичные слоты и у каждого свое назанчение.
   * Каждые слот можно идентифицировать по назначению.
   * Например сущность Gun может быть в слоте со значением свойства Slot.type равным Slot.TYPE_GUN
   *
   * @param {Array.<Slot>} gunSlots
   * @param {selectedTarget} target
   * @returns {CharacterControls}
   */
  async assignGunOnTarget(gunSlots, target) {
    for (const slot of gunSlots) {
      // удалить стрельбу оружия по бругим объектам
      for (const target of this.target) {
        // Если цель уже назначена на одну и ту-же цель то оттменяем все дальнейшие дествия
        if (target.slot.id === slot.id) {
          return this
        }
        // Удалить стрельбу по объекту
        this.removeTargetSlot(target.slot.id)
      }
      // добавить стрельбу по текущему объекту
      this.target.push({slot, target: target.object})



      await this.shapeTarget
        .squareForm(0, 0, 512, 512)
        .addText(1, (text) => {
          text.setHorizontalAlign('right').setPadding(4, 2)
        })
        .setBorder(2, 'transparent')
        .setBackgroundImage('./app/web/images/icon/rocket-slot-a.png', 4)
        .build()

      const numberTexture = new CanvasTexture(this.canvas)
      const spriteMaterial = new SpriteMaterial({map: numberTexture})

      const sprite = new Sprite(spriteMaterial);

      // const maxSize = DetectObject3D.maxSize(target.object)
      // console.log(maxSize)

      const size = DetectObject3D.size(target.object)

      console.log(size, target, target.object.position)

      console.log(size.y, size.y / 2)

      sprite.position.y = (size.y / 2 + 2)

      sprite.scale.set(2, 2, 1);
      target.object.add(sprite)









      // активный слот убераем из выбранных
      this.removeSelectedSlot(slot.id)
      // переводим состояние текущего Slot в состояние assigned
      // TODO изменить состояние кнопки
    }
    return this
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
      if (intersectedObjects.length > 0) {
        this.assignGunOnTarget(this.selectedSlots, intersectedObjects[0])
      }
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
import DebugPanel from '@app/debug/DebugPanel'
import EventControls from './EventControls'
import MouseTooltip from '@helper/MouseTooltip'
import DetectObject3D from '@helper/DetectObject3D'

import ModelAsteroid from './models/asteroid/ModelAsteroid'
import ModelStation from './models/station/ModelStation'
import ModelPlanet from './models/planet/ModelPlanet'

import Asteroid from '@entity/particles-sector/Asteroid'
import Station from '@entity/particles-sector/Station'
import Planet from '@entity/particles-sector/Planet'

class BaseModelControls {
  /**
   *
   * @param {Scene} scene
   * @param {Loader} loader
   */
  constructor(scene, loader) {
    /**
     * @type {string}
     */
    this.entity = this.constructor.name

    /**
     *
     * @type {Scene}
     */
    this.scene = scene

    /**
     * @type {Loader}
     */
    this.loader = loader

    /**
     *
     * @type {Array.<ModelStation|ModelAsteroid|ModelPlanet>}
     */
    this.elements = []

    /**
     *
     * @type {boolean}
     */
    this.enabled = true

    /**
     *
     * @type {MouseTooltip}
     */
    this.tooltip = new MouseTooltip()

    /**
     *
     * @type {EventControls}
     */
    this.eventControls = new EventControls()

    this.debugPanel = null
    setTimeout(() => {
      this.debugPanel = new DebugPanel()
        .addFolder(this.entity)
        .add(this.elements, 'length', 'Count elements')
        .add(this, 'enabled', 'Controls enabled')
    }, 2000)
  }

  /**
   *
   * @param {Loader} loader
   * @returns {void}
   */
  async beforeStart(loader) {
    for (const element of this.elements) {
      element.beforeStart(loader)
    }
  }

  /**
   *
   * @param {number} delta
   * @returns {void}
   */
  update(delta) {
    if (!this.enabled) {
      return
    }
    for (let element of this.elements) {
      element.update(delta)
    }
  }

  /**
   * сенхронизация элемента с server -> client
   *
   * @param {SwapInfo} data
   */
  setSwapInfo(data) {

  }

  /**
   *
   * @param {(Array.<Asteroid>|Array.<Planet>|Array.<Station>)} data
   * @returns {BaseModelControls}
   */
  copy(data) {
    for (const particle of data) {
      switch (particle.entity) {
        case 'Asteroid':
          this.elements.push(new ModelAsteroid(this.scene, this.loader).copy(particle))
          break
        case 'Station':
          this.elements.push(new ModelStation(this.scene, this.loader).copy(particle))
          break
        case 'Planet':
          this.elements.push(new ModelPlanet(this.scene, this.loader).copy(particle))
          break
      }
    }
    return this
  }

  /**
   *
   * @param {Intersect} intersect
   * @param {MouseEvent} mouseEvent
   * @returns {void}
   */
  updateTooltip(intersect, mouseEvent) {
    for (const element of this.elements) {
      const isIntersect = intersect.is(element.model)

      const eventName = `update.tooltip.${element.id}`
      if (isIntersect) {
        this.eventControls.ifNotActive(eventName, () => {
          const maxSize = DetectObject3D.maxSize(element.model)
          this.scene.add(
            this.tooltip
              .setPosition(
                element.model.position.x,
                element.model.position.y + maxSize + 2,
                element.model.position.z
              )
              .write(element.name)
              .getSprite()
          )
        })
      } else {
        this.eventControls.ifActive(eventName, () => {
          this.scene.remove(this.tooltip.getSprite())
        })
      }

      element.updateTooltip(intersect, mouseEvent)
    }
  }

  /**
   *
   * @param {Intersect} intersect
   * @param {MouseEvent} mouseEvent
   * @returns {void}
   */
  onClick(intersect, mouseEvent) {
    let i = 0
    for (const element of this.elements) {
      ++i
      // DEBUG PANEL
      const isIntersect = intersect.is(element.model)
      if (isIntersect) {
        const folderName = `${this.entity} ${element.name} - ${i}`
        this.prepareDebugPanel(element, folderName)
      }

      element.onClick(intersect, mouseEvent)
    }
  }

  /**
   *
   * @param {ModelStation|ModelAsteroid|ModelPlanet} element
   * @param {string} folderName
   */
  prepareDebugPanel(element, folderName) {
    this.eventControls.ifNotActive(folderName, () => {
      this.debugPanel
        .addFolder(folderName)
        .add(element.model.scale, 'x', 'Scale X', 0.01, 100)
        .add(element.model.scale, 'y', 'Scale Y', 0.01, 100)
        .add(element.model.scale, 'z', 'Scale Z', 0.01, 100)
        .add(element.model.position, 'x', 'Position X', -5000000, 5000000)
        .add(element.model.position, 'y', 'Position Y', -5000000, 5000000)
        .add(element.model.position, 'z', 'Position Z', -5000000, 5000000)
        .add(element, 'angleToCenter', 'AngleToCenter', 0, 360)
        .add(element, 'distanceToCenter', 'distanceToCenter', -5000000, 5000000)
        .add(element.model.rotation, 'x', 'rotation X', 0, 4 * Math.PI)
        .add(element.model.rotation, 'y', 'rotation Y', 0, 4 * Math.PI)
        .add(element.model.rotation, 'z', 'rotation Z', 0, 4 * Math.PI)

      if (element instanceof ModelPlanet) {

        this.debugPanel
          .add(element, 'radius', 'Radius', 0.1, 6000)
          .addEventOnChange((value, name) => {
            switch (name) {
              case 'radius':
                element.rebuildModel()
                break;
            }
          })

        if (element.glowInsideModel) {
          this.debugPanel
            .addFolder('Glow inside ' + folderName)
            .add(element.glowInsideModel.material.uniforms.coefficient, 'value', 'In.Glow coeff', -5, 5)
            .add(element.glowInsideModel.material.uniforms.power, 'value', 'In.Glow power', -5, 5)
            .add(element.glowInsideModel.material.uniforms.glowColor, 'value', 'In.Glow color', null, null, true)
            .add(element.glowInsideModel.scale, 'x', 'Scale X', 0.01, 100)
            .add(element.glowInsideModel.scale, 'y', 'Scale Y', 0.01, 100)
            .add(element.glowInsideModel.scale, 'z', 'Scale Z', 0.01, 100)
        }

        if (element.glowOutsideModel) {
          this.debugPanel
            .addFolder('Glow outside ' + folderName)
            .add(element.glowOutsideModel.material.uniforms.coefficient, 'value', 'Out.Glow coeff', -5, 5)
            .add(element.glowOutsideModel.material.uniforms.power, 'value', 'Out.Glow power', -5, 5)
            .add(element.glowOutsideModel.material.uniforms.glowColor, 'value', 'Out.Glow color', null, null, true)
            .add(element.glowOutsideModel.scale, 'x', 'Scale X', 0.01, 100)
            .add(element.glowOutsideModel.scale, 'y', 'Scale Y', 0.01, 100)
            .add(element.glowOutsideModel.scale, 'z', 'Scale Z', 0.01, 100)
        }
      }
    })
  }
}

export default BaseModelControls
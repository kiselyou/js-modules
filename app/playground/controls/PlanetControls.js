import ModelPlanet from './models/planet/ModelPlanet'
import DebugPanel from '@app/debug/DebugPanel'
import EventControls from './EventControls'
import DetectObject3D from "@helper/DetectObject3D";

class PlanetControls {
  /**
   *
   * @param {Scene} scene
   * @param {Loader} loader
   */
  constructor(scene, loader) {

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
     * @type {Array.<ModelPlanet>}
     */
    this.planets = []

    /**
     *
     * @type {Array.<Mesh>}
     */
    this.elements = []

    /**
     *
     * @type {boolean}
     */
    this.enabled = true

    /**
     *
     * @type {DebugPanel}
     */
    this.debugPanel = new DebugPanel()
      .addFolder('Planet controls')
      .add(this.planets, 'length', 'Count planets')
      .add(this, 'enabled', 'Controls enabled')

    /**
     *
     * @type {EventControls}
     */
    this.eventControls = new EventControls()
  }

  /**
   *
   * @param {Loader} loader
   * @returns {void}
   */
  async beforeStart(loader) {
    this.preparePlanets(this.planets)
    for (const modelPlanet of this.planets) {
      modelPlanet.beforeStart(loader)
      this.elements.push(modelPlanet.planet)
    }
  }

  /**
   *
   * @param {Array.<ModelPlanet>} modelPlanets
   */
  preparePlanets(modelPlanets) {
    const prepare = {}
    for (const modelPlanet of modelPlanets) {
      prepare[modelPlanet.id] = modelPlanet
    }

    for (const modelPlanet of modelPlanets) {
      const parentId = modelPlanet.parentId
      if (prepare.hasOwnProperty(parentId)) {
        modelPlanet.setParentPlanet(prepare[parentId])
      }
      modelPlanet.calculatePosition(0)
    }
  }

  /**
   *
   * @param {object} data
   * @returns {PlanetControls}
   */
  copy(data) {
    for (const planet of data.planet) {
      this.planets.push(
        new ModelPlanet(this.scene, this.loader)
          .copy(planet)
      )
    }
    return this
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
    for (let model of this.planets) {
      model.update(delta)
    }
  }

  /**
   * сенхронизация планет с server -> client
   *
   * @param {SwapInfo} data
   */
  setSwapInfo(data) {
    const swapPlanets = data.sector.planets
    for (const swapPlanet of swapPlanets) {
      const planet = this.findPlanetById(swapPlanet.id)
      if (planet) {
        planet.copy(swapPlanet)
      }
    }
  }

  /**
   *
   * @param {string} id
   * @returns {ModelPlanet|?}
   */
  findPlanetById(id) {
    const planet = this.planets.find((planet) => planet.id === id)
    return planet ? planet : null
  }

  /**
   *
   * @param {Intersect} intersect
   * @param {MouseEvent} mouseEvent
   * @returns {void}
   */
  updateTooltip(intersect, mouseEvent) {
    for (const modelPlanet of this.planets) {
      modelPlanet.updateTooltip(intersect, mouseEvent)
    }
  }

  /**
   *
   * @param {Intersect} intersect
   * @param {MouseEvent} mouseEvent
   * @returns {void}
   */
  onClick(intersect, mouseEvent) {
    for (const modelPlanet of this.planets) {

      // DEBUG PANEL
      const isIntersect = intersect.is(modelPlanet.planet)
      if (isIntersect) {
        const folderName = `Planet Model Control ${modelPlanet.name}`
        this.eventControls.ifNotActive(folderName, () => {
          this.debugPanel
            .addFolder(folderName)
            .add(modelPlanet.model.scale, 'x', 'Scale X', 0, 100)
            .add(modelPlanet.model.scale, 'y', 'Scale Y', 0, 100)
            .add(modelPlanet.model.scale, 'z', 'Scale Z', 0, 100)
            .add(modelPlanet.model.position, 'x', 'Position X', -6000, 6000)
            .add(modelPlanet.model.position, 'y', 'Position Y', -6000, 6000)
            .add(modelPlanet.model.position, 'z', 'Position Z', -6000, 6000)
            .add(modelPlanet.model.rotation, 'x', 'rotation X', 0, 4 * Math.PI)
            .add(modelPlanet.model.rotation, 'y', 'rotation Y', 0, 4 * Math.PI)
            .add(modelPlanet.model.rotation, 'z', 'rotation Z', 0, 4 * Math.PI)
        })
      }

      modelPlanet.onClick(intersect, mouseEvent)
    }
  }
}

export default PlanetControls
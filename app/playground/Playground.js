import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Clock,
  MOUSE,
  PCFSoftShadowMap, Math as tMath, Vector3, Vector2,
} from 'three'

import SpaceParticleControls from './controls/SpaceParticleControls'
import Intersect from '@helper/Intersect'
import CharacterControls from '@app/playground/controls/CharacterControls'
import SectorControls from '@app/playground/controls/SectorControls'
import Gyroscope from '@app/three-dependense/Gyroscope'
import OrbitControls from '@app/three-dependense/OrbitControls'
import LightControls from '@app/playground/controls/LightControls'
import ParticlePlayGround from '@entity/ParticlePlayGround'
import ParticlePlayer from '@entity/ParticlePlayer'
import EventControls from './controls/EventControls'
import Ajax from '@helper/ajax/Ajax'
import Tooltip from './decoration/html/Tooltip'

import DebugPanelShip from './debug/DebugPanelShip'
import StatusFPS from './debug/StatusFPS'

class Playground {
  /**
   *
   * @param {ParticlePlayGround} particlePlayGround
   * @param {Loader} loader
   */
  constructor(loader, particlePlayGround) {

    /**
     *
     * @type {ParticlePlayGround}
     */
    this.particlePlayGround = particlePlayGround

    /**
     *
     * @type {Clock}
     */
    this.clockCore = new Clock();

    /**
     *
     * @type {Clock}
     */
    this.clockUI = new Clock();

    /**
     *
     * @type {Loader}
     */
    this.loader = loader

    /**
     *
     * @type {Scene}
     */
    this.scene = new Scene()

    /**
     *
     * @type {string|?}
     */
    this.requestId = null

    /**
     *
     * @type {PerspectiveCamera}
     */
    this.camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10000)
    this.camera.position.set(0, -40, -50)
    this.scene.add(this.camera)

    /**
     *
     * @type {WebGLRenderer}
     */
    this.renderer = new WebGLRenderer({ antialias: true })

    /**
     *
     * @type {LightControls}
     */
    this.lightControls = new LightControls(this.scene, this.loader)

    /**
     *
     * @type {SectorControls}
     */
    this.sectorControls = new SectorControls(this.scene, this.loader)

    /**
     *
     * @type {CharacterControls}
     */
    this.character = new CharacterControls(this)

    /**
     *
     * @type {SpaceParticleControls}
     */
    this.spaceParticleControls = new SpaceParticleControls(this.character, this.loader)
    this.scene.add(this.spaceParticleControls.model)

    /**
     *
     * @type {EventControls}
     */
    this.eventControls = new EventControls()

    /**
     *
     * @type {Array.<CharacterControls>}
     */
    this.playersControls = []

    /**
     *
     * @type {LightControls}
     */
    this.scene.add(this.lightControls.pointLight)
    this.scene.add(this.lightControls.hemisphereLight)
    this.scene.add(this.lightControls.ambientLight)

    /**
     *
     * @type {OrbitControls}
     */
    this.cameraControls = new OrbitControls(this.camera, this.renderer.domElement)
    this.cameraControls.target.copy(this.character.model.position)
    this.cameraControls.enableKeys = false
    this.cameraControls.enablePan = false
    this.cameraControls.mouseButtons = { ORBIT: MOUSE.RIGHT, ZOOM: MOUSE.MIDDLE, PAN: MOUSE.LEFT };
    this.cameraControls.minDistance = 30
    this.cameraControls.maxDistance = 250
    this.cameraControls.maxPolarAngle = tMath.degToRad(80)
    this.cameraControls.update()

    /**
     *
     * @type {Gyroscope}
     */
    this.gyroscope = new Gyroscope()
    this.gyroscope.add(this.camera);
    this.character.model.add(this.gyroscope)
    this.scene.add(this.character.model)

    /**
     *
     * @type {Intersect}
     */
    this.intersect = new Intersect(this.camera, this.gyroscope)

    /**
     *
     * @type {StatusFPS}
     */
    this.status = new StatusFPS()

    /**
     *
     * @type {Tooltip}
     */
    this.tooltip = new Tooltip(this)
  }

  /**
   *
   * @param {string} rootContainerId
   * @returns {Playground}
   */
  init(rootContainerId) {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.gammaInput = false;
    this.renderer.gammaOutput = false;

    document.getElementById(rootContainerId)
      .appendChild(this.renderer.domElement)

    this.beforeStart()
      .then(() => {
        this
          .updateCore()
          .afterStart()
          .buildPanel(rootContainerId)
      })

    return this
  }

  /**
   *
   * @returns {Promise<void>}
   */
  async beforeStart() {
    this.copy(this.particlePlayGround)
    await this.sectorControls.beforeStart()
    await this.character.beforeStart()
    await this.spaceParticleControls.beforeStart()
  }

  /**
   *
   * @returns {Playground}
   */
  afterStart() {
    new DebugPanelShip(this.character).build()
    this.status.build()
    return this
  }

  /**
   *
   * @param {string} rootContainerId
   * @returns {Playground}
   */
  buildPanel(rootContainerId) {
    this.character.buildPanel()
    const canvas = this.character.userPanel.canvas
    document.getElementById(rootContainerId).appendChild(canvas)
    canvas.addEventListener('click', (event) => {
      this.character.panelMouseClick(event, 'left')
    }, false)
    canvas.addEventListener('contextmenu', (event) => {
      event.preventDefault()
      this.character.panelMouseClick(event, 'right')
    }, false)
    return this
  }

  /**
   *
   * @param {ParticlePlayGround} data
   * @return {Playground}
   */
  copy(data) {
    this.sectorControls.copy(data)

    const player = data.getCurrentPlayer()
    this.character.copy(player)

    const spaceship = data.getPlayerSpaceship(player)
    this.character.spaceship.copy(spaceship)
    return this
  }

  /**
   *
   * @param {Object} playerData
   * @return {Playground}
   */
  addPlayer(playerData) {
    const playerId = playerData.id
    Ajax.post('/player/data/add', { id: playerId })
      .then((particlePlayerJson) => {
        const particlePlayer = new ParticlePlayer().jsonToObject(particlePlayerJson)
        this.particlePlayGround.addParticlePlayer(particlePlayer)

        const player = this.particlePlayGround.getPlayerById(playerId)
        const playerControls = new CharacterControls(this)
        playerControls.copy(player)

        const spaceship = this.particlePlayGround.getPlayerSpaceship(player)
        playerControls.spaceship.copy(spaceship)
        playerControls.beforeStart()
        this.playersControls.push(playerControls)
        this.scene.add(playerControls.model)
      })
      .catch((error) => console.log(error, 'Something went wrong. Cannot add new player to scene.'))
  }

  /**
   *
   * @param {string} playerId
   * @return {Playground}
   */
  removePlayer(playerId) {
    for (let i = 0; i < this.playersControls.length; i++) {
      const playerControls = this.playersControls[i]
      if (playerControls.id === playerId) {
        this.scene.remove(playerControls.model)
        this.playersControls.splice(i, 1)
        break;
      }
    }
    return this
  }

  /**
   *
   * @param {string} playerId
   * @return {CharacterControls|null}
   */
  findPlayerControls(playerId) {
    for (const playerControls of this.playersControls) {
      if (playerControls.id === playerId) {
        return playerControls
      }
    }
    return null
  }

  /**
   *
   * @returns {Playground}
   */
  updateCore() {
    this.status.update()
    const delta = this.clockCore.getDelta()

    this.character
      .update(delta)
      .updatePanel(delta)
      .updateTooltipTarget(delta)

    for (const player of this.playersControls) {
      player.update(delta)
    }

    this.sectorControls.update(delta, this.character.model.position)
    this.lightControls.update(delta, this.character.model.position)
    this.spaceParticleControls.update(delta)
    this.tooltip.update(delta)

    this.renderer.render(this.scene, this.camera)
    this.requestId = requestAnimationFrame(() => {
      this.updateCore()
    })

    return this
  }

  /**
   *
   * @returns {Playground}
   */
  animateStop() {
    if (this.requestId) {
      cancelAnimationFrame(this.requestId)
      this.requestId = null
    }
    return this
  }

  /**
   *
   * @param {SwapInfo} data
   * @returns {Playground}
   */
  setSwapInfo(data) {
    this.sectorControls.setSwapInfo(data)
    return this
  }

  /**
   *
   * @param {MouseEvent} e
   * @returns {void}
   */
  onMouseMove(e) {
    this.intersect.updateMouse(e)
  }

  /**
   *
   * @param {MouseEvent} e
   * @returns {void}
   */
  onLeftMouseClick(e) {
    this.intersect.updateMouse(e)
    this.character.onLeftMouseClick(this.intersect, e)
  }

  /**
   *
   * @param {MouseEvent} e
   * @returns {void}
   */
  onRightMouseClick(e) {
    this.intersect.updateMouse(e)
    const models = this.character.getModels(false, 10000)
    const intersection = this.intersect.findIntersection(models, false)
    if (intersection.length > 0) {
      this.tooltip
        .setTarget(intersection[0]['object'])
        .draw()
    } else {
      this.tooltip.remove()
    }
  }

  /**
   * @returns {void}
   */
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.camera.updateProjectionMatrix()
  }

  /**
   *
   * @param {KeyboardEvent} e
   * @returns {void}
   */
  onKeyDown(e) {
    switch (e.keyCode) {
      case 65://A
        this.character.moveControls.enableLeft(true)
        break
      case 68://D
        this.character.moveControls.enableRight(true)
        break
      case 87://W
        this.character.moveControls.enableForward(true)
        break
      case 83://S
        this.character.moveControls.enableBackward(true)
        break
      case 32://Space
        this.character.moveControls.enableSlowdown(true)
        break
      case 27:
        this.tooltip.remove()
        break
      default:
        // console.log(e, 'def')
    }
  }

  /**
   *
   * @param {KeyboardEvent} e
   * @returns {void}
   */
  onKeyUp(e) {
    switch (e.keyCode) {
      case 65://A
        this.character.moveControls.enableLeft(false)
        break
      case 68://D
        this.character.moveControls.enableRight(false)
        break
      case 87://W
        this.character.moveControls.enableForward(false)
        break
      case 83://S
        this.character.moveControls.enableBackward(false)
        break
      case 32://Space
        this.character.moveControls.enableSlowdown(false)
        break
      default:
        // console.log(e, 'def')
    }
  }

  /**
   *
   * @return {Playground}
   */
  registrationEvents() {
    this.renderer.domElement.addEventListener('mousemove', (mouseEvent) => this.onMouseMove(mouseEvent), false);
    this.renderer.domElement.addEventListener('click', (mouseEvent) => this.onLeftMouseClick(mouseEvent), false);
    this.renderer.domElement.addEventListener('contextmenu', (mouseEvent) => this.onRightMouseClick(mouseEvent), false);

    window.addEventListener('keydown', (keyboardEvent) => this.onKeyDown(keyboardEvent), false);
    window.addEventListener('keyup', (keyboardEvent) => this.onKeyUp(keyboardEvent), false);
    window.addEventListener('resize', () => this.onWindowResize(), false)

    return this
  }
}

export default Playground
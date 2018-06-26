import {
  PerspectiveCamera,
  OrthographicCamera,
  Scene,
  WebGLRenderer,
  Clock,
  MOUSE,
  PCFSoftShadowMap, Math as tMath,
  AxesHelper,
  Mesh,
  MeshBasicMaterial,
  CubeGeometry
} from 'three'

import SpaceParticleControls from './controls/SpaceParticleControls'

import Stats from 'stats-js'
import Intersect from '@helper/Intersect'

import CharacterControls from '@app/playground/controls/CharacterControls'
import SectorControls from '@app/playground/controls/SectorControls'

import Gyroscope from '@app/three-dependense/Gyroscope'
import OrbitControls from '@app/three-dependense/OrbitControls'
import DebugPanel from '@app/debug/DebugPanel'
import LightControls from '@app/playground/controls/LightControls'
import ParticlePlayGround from '@entity/ParticlePlayGround'
import ParticlePlayer from '@entity/ParticlePlayer'
import EventControls from './controls/EventControls'
import Ajax from '@helper/ajax/Ajax'

const stats = new Stats()
// stats.setMode(1)
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild(stats.domElement);

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
    this.clock = new Clock();

    /**
     *
     * @type {number}
     */
    this.deltaInterval = this.clock.getDelta()

    /**
     *
     * @type {number}
     */
    this.delta = this.clock.getDelta()

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
    this.character = new CharacterControls(this.scene, this.loader)

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
    this.character.model.addToGroup(this.gyroscope)
    this.scene.add(this.character.model)

    /**
     *
     * @type {Intersect}
     */
    this.intersect = new Intersect(this.camera, this.gyroscope)

    this.axesHelper = new AxesHelper(150)
    this.scene.add(this.axesHelper)

    const panel = new DebugPanel()

    setTimeout(() => {

      const engine = this.character.spaceship.getEngine()
      panel
        .addFolder('Renderer controls')
        .listenFields(true)
        .add(this.renderer.shadowMap, 'enabled', 'Shadow map')
        .add(this.renderer, 'gammaInput', 'Gamma input')
        .add(this.renderer, 'gammaOutput', 'Gamma output')
        .listenFields(false)
        .addEventOnChange((value, name) => {
          switch (name) {
            case 'enabled':
            case 'gammaInput':
            case 'gammaOutput':
              this.renderer.dispose()
          }
        })

        .addFolder('Point light controls')
        .listenFields(true)
        .add(this.lightControls, 'pointLightMoveWithModel', 'Move with model')
        .add(this.lightControls.pointLight, 'castShadow', 'Cast Shadow')
        .listenFields(false)
        .add(this.lightControls.pointLight, 'decay', 'Decay', 0, 5)
        .add(this.lightControls.pointLight, 'distance', 'Distance', 0, 8000)
        .add(this.lightControls.pointLight, 'power', 'Power', 0, 1000)
        .add(this.lightControls.pointLight, 'color', 'Color', null, null, true)
        .add(this.lightControls.pointLight, 'intensity', 'Intensity', 0, 100)
        .add(this.lightControls.pointLight.position, 'x', 'X', -2000, 2000)
        .add(this.lightControls.pointLight.position, 'y', 'Y', -2000, 2000)
        .add(this.lightControls.pointLight.position, 'z', 'Z', -2000, 2000)

        .addFolder('Hemisphere light controls')
        .listenFields(true)
        .add(this.lightControls, 'hemisphereLightMoveWithModel', 'Move with model')
        .listenFields(false)
        .add(this.lightControls.hemisphereLight, 'color', 'Sky Color', null, null, true)
        .add(this.lightControls.hemisphereLight, 'groundColor', 'Ground Color', null, null, true)
        .add(this.lightControls.hemisphereLight, 'intensity', 'Intensity', 0, 100)
        .add(this.lightControls.hemisphereLight.position, 'x', 'X', -2000, 2000)
        .add(this.lightControls.hemisphereLight.position, 'y', 'Y', -2000, 2000)
        .add(this.lightControls.hemisphereLight.position, 'z', 'Z', -2000, 2000)

        .addFolder('Ambient light controls')
        .listenFields(true)
        .add(this.lightControls, 'ambientLightMoveWithModel', 'Move with model')
        .listenFields(false)
        .add(this.lightControls.ambientLight, 'color', 'Color', null, null, true)
        .add(this.lightControls.ambientLight, 'intensity', 'Intensity', 0, 2)
        .add(this.lightControls.ambientLight.position, 'x', 'X', -2000, 2000)
        .add(this.lightControls.ambientLight.position, 'y', 'Y', -2000, 2000)
        .add(this.lightControls.ambientLight.position, 'z', 'Z', -2000, 2000)

        .addFolder('Camera')
        .add(this.camera, 'fov', 'Fov', 0, 100)
        .add(this.camera, 'far', 'Far', 500, 15000)
        .add(this.camera, 'zoom', 'Zoom', 0.1, 100)
        .addEventOnChange((value, name) => {
          switch (name) {
            case 'fov':
            case 'far':
            case 'zoom':
              this.camera.updateProjectionMatrix()
          }
        })
        .addFolder('CameraControls')
        .listenFields(true)
        .add(this.cameraControls, 'enableKeys', 'EnableKeys')
        .add(this.cameraControls, 'enablePan', 'EnablePan')
        .listenFields(false)
        .add(this.cameraControls, 'minDistance', 'MinDistance', 0, 100)
        .add(this.cameraControls, 'maxDistance', 'MaxDistance', 101, 2000)
        .add(this.cameraControls, 'maxPolarAngle', 'MaxPolarAngle', 0, Math.PI)

        .addFolder('Ship Controls')
        .listenFields(true)
        .add(this.character, 'enabled', 'Controls enabled')
        .listenFields(false)
        .addFolder('Ship Info')
        .listenFields(true)
        .add(engine, 'speed', 'Ship Speed')
        .add(this.character.model.position, 'x', 'Ship X')
        .add(this.character.model.position, 'y', 'Ship Y')
        .add(this.character.model.position, 'z', 'Ship Z')
        .listenFields(false)
        .addFolder('Ship speed')
        .add(engine, 'maxSpeed', 'Max', 10, 400)
        .add(engine, 'maxReverseSpeed', 'Max Reverse', -200, 0)
        .add(engine, 'angularSpeed', 'Angular Speed', 0.01, 5)
        .add(engine, 'acceleration', 'Acceleration', 10, 500)
        .add(engine, 'deceleration', 'Deceleration', 10, 500)
        .addFolder('Ship Scale')
        .add(this.character.model.scale, 'x', 'Scale X', 0, 5)
        .add(this.character.model.scale, 'y', 'Scale Y', 0, 5)
        .add(this.character.model.scale, 'z', 'Scale Z', 0, 5)
    }, 3000)
  }

  /**
   *
   * @param {string} rootContainerId
   * @returns {Playground}
   */
  async init(rootContainerId) {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.gammaInput = false;
    this.renderer.gammaOutput = false;

    document.getElementById(rootContainerId)
      .appendChild(this.renderer.domElement)

    this.copy(this.particlePlayGround)
    await this.sectorControls.beforeStart()
    await this.character.beforeStart()
    await this.character.buildAim()
    await this.spaceParticleControls.beforeStart()
    await this.buildPanel(rootContainerId)
    setTimeout(() => {
      this.animateStart()

      setInterval(async () => {
        await this.character.userPanel.update()
      }, 1000 / 10)

    }, 1000)
    return this
  }

  /**
   *
   * @returns {Promise<void>}
   */
  async buildPanel(rootContainerId) {
    await this.character.buildPanel()
    const canvas = this.character.userPanel.canvas
    document.getElementById(rootContainerId).appendChild(canvas)
    canvas.addEventListener('click', (event) => {
      this.character.panelMouseClick(event)
    }, false)
  }

  /**
   *
   * @param {ParticlePlayGround} data
   * @return {Playground}
   */
  copy(data) {
    this.sectorControls.copy(data)
    this.character
      .copyPlayer(data.getCurrentPlayer())
      .copy(data)
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
        const playerControls = new CharacterControls(this.scene, this.loader)
        playerControls
          .copyPlayer(player)
          .copy(this.particlePlayGround)

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
      if (playerControls.player.id === playerId) {
        this.scene.remove(playerControls)
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
      if (playerControls.player.id === playerId) {
        return playerControls
      }
    }
    return null
  }

  /**
   *
   * @returns {Playground}
   */
  animateStart() {
    stats.update()
    this.delta = this.clock.getDelta()
    this.character.update(this.delta)
    for (const player of this.playersControls) {
      player.update(this.delta)
    }

    const position = this.character.model.position
    this.sectorControls.update(this.delta, position)
    this.lightControls.update(this.delta, position)
    this.spaceParticleControls.update(this.delta)
    this.renderer.render(this.scene, this.camera)
    this.requestId = requestAnimationFrame(() => {
      this.animateStart()
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
    this.character.updateTooltip(this.intersect, e)
    this.sectorControls.updateTooltip(this.intersect, e)
  }

  /**
   *
   * @param {MouseEvent} e
   * @returns {void}
   */
  onMouseClick(e) {
    this.intersect.updateMouse(e)
    this.sectorControls.onClick(this.intersect, e)
    this.character.onMouseClick(this.intersect, e)
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
    this.renderer.domElement.addEventListener('click', (mouseEvent) => this.onMouseClick(mouseEvent), false);
    window.addEventListener('keydown', (keyboardEvent) => this.onKeyDown(keyboardEvent), false);
    window.addEventListener('keyup', (keyboardEvent) => this.onKeyUp(keyboardEvent), false);
    window.addEventListener('resize', () => this.onWindowResize(), false)

    return this
  }
}

export default Playground
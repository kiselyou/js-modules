import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Clock,
  MOUSE,
  PCFSoftShadowMap, Math as tMath,
  AxesHelper
} from 'three'

import Stats from 'stats-js'
import Intersect from '@helper/Intersect'

import CharacterControls from '@app/playground/controls/CharacterControls'
import SectorControls from '@app/playground/controls/SectorControls'

import Gyroscope from '@app/three-dependense/Gyroscope'
import OrbitControls from '@app/three-dependense/OrbitControls'
import DebugPanel from '@app/debug/DebugPanel'

const stats = new Stats()
// stats.setMode(1)
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild(stats.domElement);

class Playground {
  /**
   *
   * @param {Loader} loader
   */
  constructor(loader) {

    /**
     *
     * @type {Clock}
     */
    this.clock = new Clock();

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
     * @type {SectorControls}
     */
    this.sectorControls = new SectorControls(this.scene, this.loader)

    /**
     *
     * @type {CharacterControls}
     */
    this.characterControls = new CharacterControls(this.scene, this.loader)

    /**
     *
     * @type {LightControls}
     */
    this.scene.add(this.sectorControls.lightControls.pointLight)
    this.scene.add(this.sectorControls.lightControls.hemisphereLight)
    this.scene.add(this.sectorControls.lightControls.ambientLight)

    /**
     *
     * @type {OrbitControls}
     */
    this.cameraControls = new OrbitControls(this.camera, this.renderer.domElement)
    this.cameraControls.target.copy(this.characterControls.model.position)
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
    this.characterControls.model.add(this.gyroscope)
    this.scene.add(this.characterControls.model)

    /**
     *
     * @type {Intersect}
     */
    this.intersect = new Intersect(this.camera, this.gyroscope)

    this.axesHelper = new AxesHelper(150)
    this.scene.add(this.axesHelper)

    new DebugPanel()
      .addFolder('Renderer controls')
      .add(this.renderer.shadowMap, 'enabled', 'Shadow map')
      .add(this.renderer, 'gammaInput', 'Gamma input')
      .add(this.renderer, 'gammaOutput', 'Gamma output')
      .addEventOnChange((value, name) => {
        switch (name) {
          case 'enabled':
          case 'gammaInput':
          case 'gammaOutput':
            this.renderer.dispose()
        }
      })
  }

  /**
   *
   * @param {string} parentId
   * @param {string} canvasId
   * @returns {Playground}
   */
  async init(parentId, canvasId) {
    this.renderer.domElement.id = canvasId
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;

    document.getElementById(parentId).appendChild(this.renderer.domElement)

    await this.sectorControls.beforeStart()
    await this.characterControls.beforeStart()

    this.animateStart()
    return this
  }

  /**
   *
   * @param {Object} data
   * @return {Playground}
   */
  copy(data) {
    this.sectorControls.copy(data)
    this.characterControls.copy(data)
    return this
  }

  /**
   *
   * @returns {Playground}
   */
  animateStart() {
    stats.update()
    this.delta = this.clock.getDelta()
    this.characterControls.update(this.delta)
    this.sectorControls.update(this.delta, this.characterControls.model.position)
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
   * @returns {Player}
   */
  get player() {
    return this.characterControls.player
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
    this.characterControls.updateTooltip(this.intersect, e)
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
        this.characterControls.enableLeft(true)
        break
      case 68://D
        this.characterControls.enableRight(true)
        break
      case 87://W
        this.characterControls.enableForward(true)
        break
      case 83://S
        this.characterControls.enableBackward(true)
        break
      case 32://Space
        this.characterControls.enableSlowdown(true)
        break
      default:
        console.log(e, 'def')
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
        this.characterControls.enableLeft(false)
        break
      case 68://D
        this.characterControls.enableRight(false)
        break
      case 87://W
        this.characterControls.enableForward(false)
        break
      case 83://S
        this.characterControls.enableBackward(false)
        break
      case 32://Space
        this.characterControls.enableSlowdown(false)
        break
      default:
        console.log(e, 'def')
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
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

import PlayerControls from '@app/playground/controls/PlayerControls'
import LightControls from '@app/playground/controls/LightControls'
import SectorControls from '@app/playground/controls/SectorControls'

import Gyroscope from '@app/three-dependense/Gyroscope'
import OrbitControls from '@app/three-dependense/OrbitControls'

const stats = new Stats()
// stats.setMode(1)
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild( stats.domElement );

class Playground {
  /**
   *
   * @param {Loader} loader
   */
  constructor(loader) {
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
     * @type {Clock}
     */
    this.clock = new Clock();

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
     * @type {PlayerControls}
     */
    this.playerControls = new PlayerControls(this.scene, this.loader)

    /**
     *
     * @type {LightControls}
     */
    this.lightControls = new LightControls(this.scene, this.loader)
    this.scene.add(this.lightControls.pointLight)
    this.scene.add(this.lightControls.hemisphereLight)
    this.scene.add(this.lightControls.ambientLight)

    /**
     *
     * @type {OrbitControls}
     */
    this.cameraControls = new OrbitControls(this.camera, this.renderer.domElement)
    this.cameraControls.target.copy(this.playerControls.model.position)
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
    this.gyroscope.add(this.lightControls.light, this.lightControls.light.target);
    this.playerControls.model.add(this.gyroscope)
    this.scene.add(this.playerControls.model)

    /**
     *
     * @type {Intersect}
     */
    this.intersect = new Intersect(this.camera)

    this.axesHelper = new AxesHelper(150)
    this.scene.add(this.axesHelper)
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
    // this.renderer.setClearColor(0x1C1C1C)
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;

    document.getElementById(parentId).appendChild(this.renderer.domElement)
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.camera.updateProjectionMatrix()
    })

    await this.sectorControls.beforeStart()
    await this.playerControls.beforeStart()

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
    this.playerControls.copy(data)
    return this
  }

  /**
   *
   * @returns {Playground}
   */
  animateStart() {
    let delta = this.clock.getDelta()
    this.playerControls.update(delta)
    this.sectorControls.update(delta, this.camera.position)
    this.renderer.render(this.scene, this.camera)
    this.requestId = requestAnimationFrame(() => {
      this.animateStart()
    })
    stats.update()
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
    return this.playerControls.player
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
   * @param {MouseEvent} mouseEvent
   */
  onDocumentMouseMove(mouseEvent) {
    this.intersect.updateMouse(mouseEvent)
    this.playerControls.updateTooltip(this.intersect, mouseEvent)
    this.sectorControls.updateTooltip(this.intersect, mouseEvent)
  }

  /**
   *
   * @return {Playground}
   */
  registrationEvents() {
    this.renderer.domElement.addEventListener('mousemove', (mouseEvent) => this.onDocumentMouseMove(mouseEvent), false);
    return this
  }
}

export default Playground
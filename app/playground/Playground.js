import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Clock,
  GridHelper,
  AxesHelper,
  PCFSoftShadowMap
} from 'three'
import OrbitControls from 'three-orbitcontrols'
import PlayerControls from './controls/PlayerControls'
import LightControls from './controls/LightControls'
import Intersect from '@helper/Intersect'
import SectorControls from '@app/playground/controls/SectorControls'

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

    this.camera.position.x = 450
    this.camera.position.z = -15
    this.camera.position.y = 15
    this.cameraControls = new OrbitControls(this.camera, this.renderer.domElement)
    this.cameraControls.update()

    /**
     *
     * @type {Intersect}
     */
    this.intersect = new Intersect(this.camera)

    // const gridHelper = new GridHelper(50, 50 )
    // this.scene.add(gridHelper)
    //
    // const axisHelper = new AxesHelper(10)
    // this.scene.add(axisHelper)
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
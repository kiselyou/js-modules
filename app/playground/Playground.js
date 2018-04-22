import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Clock,
  GridHelper,
  AxesHelper
} from 'three'
import OrbitControls from 'three-orbitcontrols'
import PlayerControls from './controls/PlayerControls'

class Playground {
  constructor() {
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
    this.camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 1000)

    /**
     *
     * @type {WebGLRenderer}
     */
    this.renderer = new WebGLRenderer({antialias: true})

    /**
     *
     * @type {PlayerControls}
     */
    this.playerControls = new PlayerControls(this.scene)

    this.camera.position.z = -15
    this.camera.position.y = 15
    this.cameraControls = new OrbitControls(this.camera, this.renderer.domElement)
    this.cameraControls.update()

    const gridHelper = new GridHelper(50, 50 );
    this.scene.add(gridHelper);

    const axisHelper = new AxesHelper(10);
    this.scene.add(axisHelper);
  }

  /**
   *
   * @param {string} parentId
   * @param {string} canvasId
   * @returns {Playground}
   */
  init(parentId, canvasId) {
    this.renderer.domElement.id = canvasId
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.getElementById(parentId).appendChild(this.renderer.domElement)
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.camera.updateProjectionMatrix()
    });
    this.animateStart()
    return this
  }

  /**
   *
   * @returns {Playground}
   */
  animateStart() {
    let delta = this.clock.getDelta();
    this.playerControls.update(delta)
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
}

export default Playground
import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Clock,
  Mesh,
  BoxGeometry,
  MeshPhongMaterial,
  PlaneBufferGeometry,
  TextureLoader,
  AmbientLight,
  DirectionalLight,
  GridHelper,
  AxesHelper,
  Fog,
  Color,
  Math as tMath,
  PCFSoftShadowMap,
  RepeatWrapping
} from 'three'

import Stats from 'stats-js'

const stats = new Stats()
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild( stats.domElement );


class DefaultScene {
  /**
   *
   */
  constructor() {

    /**
     *
     * @type {string|?}
     */
    this.requestId = null

    /**
     *
     * @type {number}
     */
    this.delta = 0

    /**
     *
     * @type {Clock}
     */
    this.clock = new Clock();

    /**
     *
     * @type {Scene}
     */
    this.scene = new Scene()
    this.scene.background = new Color( 0xffffff )
    this.scene.fog = new Fog(0xffffff, 500, 3000)

    /**
     *
     * @type {PerspectiveCamera}
     */
    this.camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10000)
    this.camera.position.set(45, -15, 15)
    this.scene.add(this.camera)

    this.scene.add(new AmbientLight(0x222222))

    this.light = new DirectionalLight(0xffffff, 2.25)
    this.light.position.set(200, 450, 500)
    this.light.castShadow = true
    this.light.shadow.mapSize.width = 1024
    this.light.shadow.mapSize.height = 512
    this.light.shadow.camera.near = 100
    this.light.shadow.camera.far = 1200
    this.light.shadow.camera.left = -1000
    this.light.shadow.camera.right = 1000
    this.light.shadow.camera.top = 350
    this.light.shadow.camera.bottom = -350
    this.scene.add(this.light)

    const gt = new TextureLoader().load('./app-debug/web/images/grasslight-big.jpg')
    const gg = new PlaneBufferGeometry(8000, 8000)
    const gm = new MeshPhongMaterial({color: 0xBBEB71, map: gt })
    this.ground = new Mesh( gg, gm )
    this.ground.rotation.x = - Math.PI / 2
    // this.ground.receiveShadow = true
    this.ground.material.map.repeat.set( 14, 14 );
    this.ground.material.map.wrapS = RepeatWrapping;
    this.ground.material.map.wrapT = RepeatWrapping;
    this.scene.add(this.ground)

    /**
     *
     * @type {WebGLRenderer}
     */
    this.renderer = new WebGLRenderer({ antialias: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;

  }

  /**
   *
   * @param {string} parentId
   * @param {string} canvasId
   * @returns {DefaultScene}
   */
  async init(parentId, canvasId) {
    this.renderer.domElement.id = canvasId
    document.getElementById(parentId).appendChild(this.renderer.domElement)
    window.addEventListener('resize', () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight)

      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
    })
    return this
  }

  /**
   *
   * @param {Object} data
   * @return {DefaultScene}
   */
  copy(data) {
    return this
  }

  /**
   *
   * @returns {DefaultScene}
   */
  update() {
    this.delta = this.clock.getDelta()
    this.renderer.render(this.scene, this.camera)
    this.requestId = requestAnimationFrame(() => {
      this.update()
    })
    stats.update();
    return this
  }

  /**
   *
   * @returns {DefaultScene}
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
   * @param {MouseEvent} mouseEvent
   */
  onDocumentMouseMove(mouseEvent) {

  }

  /**
   *
   * @return {DefaultScene}
   */
  registrationEvents() {
    this.renderer.domElement.addEventListener('mousemove', (mouseEvent) => this.onDocumentMouseMove(mouseEvent), false);
    return this
  }
}

export default DefaultScene
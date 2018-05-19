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

import Gyroscope from './../app/three-dependense/Gyroscope'
import OrbitControls from './../app/three-dependense/OrbitControls'
import Stats from 'stats-js'

const stats = new Stats()
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild( stats.domElement );


class Playground {
  /**
   *
   */
  constructor() {

    this.requestId = null

    /**
     *
     * @type {Scene}
     */
    this.scene = new Scene()
    this.scene.background = new Color( 0xffffff )
    this.scene.fog = new Fog(0xffffff, 500, 3000)

    /**
     *
     * @type {Clock}
     */
    this.clock = new Clock();

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
    // this.renderer.shadowMap.enabled = true;
    // this.renderer.shadowMap.type = PCFSoftShadowMap;
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;

    /**
     *
     * @type {OrbitControls}
     */
    this.cameraControls = new OrbitControls(this.camera, this.renderer.domElement)
    this.cameraControls.target.set(0, 0, 0)

    this.cameraControls.enableKeys = false
    this.cameraControls.minDistance = 250
    this.cameraControls.maxDistance = 600
    this.cameraControls.maxPolarAngle = tMath.degToRad(60)
    this.cameraControls.update()


    this.player = new Mesh()
    this.player.geometry = new BoxGeometry(12, 12, 12)
    this.player.material = new MeshPhongMaterial({ color: 0xFF0000 })
    this.player.castShadow = true
    this.player.receiveShadow = true
    this.scene.add(this.player)


    /**
     *
     * @type {Gyroscope}
     */
    this.gyroscope = new Gyroscope()
    this.gyroscope.add(this.camera)
    this.gyroscope.add(this.light, this.light.target)
    this.player.add(this.gyroscope)


    const gridHelper = new GridHelper(50, 50)
    this.scene.add(gridHelper)

    const axisHelper = new AxesHelper(10)
    this.scene.add(axisHelper)

    this.speed = 50;
    this.angularSpeed = 0.5;
    this.bodyOrientation = 0;
  }

  /**
   *
   * @param {string} parentId
   * @param {string} canvasId
   * @returns {Playground}
   */
  async init(parentId, canvasId) {
    this.renderer.domElement.id = canvasId
    document.getElementById(parentId).appendChild(this.renderer.domElement)
    window.addEventListener('resize', () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight)

      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
    })

    this.animateStart()
    return this
  }

  /**
   *
   * @param {Object} data
   * @return {Playground}
   */
  copy(data) {
    return this
  }

  /**
   *
   * @returns {Playground}
   */
  animateStart() {
    let delta = this.clock.getDelta()


    this.bodyOrientation += delta * this.angularSpeed;
    let forwardDelta = this.speed * delta;

    this.player.position.x += Math.sin( this.bodyOrientation ) * forwardDelta;
    this.player.position.z += Math.cos( this.bodyOrientation ) * forwardDelta;

    // steering


    this.player.rotation.y = this.bodyOrientation;


    this.renderer.render(this.scene, this.camera)
    this.requestId = requestAnimationFrame(() => {
      this.animateStart()
    })
    stats.update();
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
   * @param {MouseEvent} mouseEvent
   */
  onDocumentMouseMove(mouseEvent) {

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
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
  PCFSoftShadowMap,
  RepeatWrapping
} from 'three'

import Gyroscope from './../app/three-dependense/Gyroscope'
import OrbitControls from 'three-orbitcontrols'
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
    // this.camera.up.set(0, 0, 1)

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
    const gg = new PlaneBufferGeometry(16000, 16000)
    const gm = new MeshPhongMaterial({color: 0xBBEB71, map: gt })
    this.ground = new Mesh( gg, gm )
    this.ground.rotation.x = - Math.PI / 2
    this.ground.receiveShadow = true
    this.ground.material.map.repeat.set( 64, 64 );
    this.ground.material.map.wrapS = RepeatWrapping;
    this.ground.material.map.wrapT = RepeatWrapping;
    this.scene.add(this.ground)

    /**
     *
     * @type {WebGLRenderer}
     */
    this.renderer = new WebGLRenderer({ antialias: true })

    /**
     *
     * @type {OrbitControls}
     */
    this.cameraControls = new OrbitControls(this.camera, this.renderer.domElement)
    this.cameraControls.target.set(0, 50, 0)
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
    // this.gyroscope = new Gyroscope()
    // this.gyroscope.add(this.camera);
    // this.player.add(this.gyroscope)


    const gridHelper = new GridHelper(50, 50)
    gridHelper.up.set(0, 1, 0)
    this.scene.add(gridHelper)

    const axisHelper = new AxesHelper(10)
    this.scene.add(axisHelper)

    this.speed = 100;
    this.angularSpeed = 2.5;
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
    stats.begin()
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
    stats.end()
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
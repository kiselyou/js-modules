import {
  BoxGeometry,
  Math as tMath, Mesh, MeshPhongMaterial
} from 'three'


import OrbitControls from '@app/three-dependense/OrbitControls'
import Gyroscope from '@app/three-dependense/Gyroscope'

class ModelControls {
  /**
   *
   * @param {DefaultScene} defaultScene
   */
  constructor(defaultScene) {
    /**
     *
     * @type {DefaultScene}
     */
    this.defaultScene = defaultScene

    /**
     *
     * @type {Mesh}
     */
    this.model = new Mesh()
    this.model.geometry = new BoxGeometry(12, 12, 12)
    this.model.material = new MeshPhongMaterial({ color: 0xFF0000 })
    this.model.castShadow = true
    this.model.receiveShadow = true
    this.defaultScene.scene.add(this.model)

    /**
     *
     * @type {OrbitControls}
     */
    this.cameraControls = new OrbitControls(this.defaultScene.camera, this.defaultScene.renderer.domElement)
    this.cameraControls.target.set(0, 0, 0)
    this.cameraControls.enableKeys = false
    this.cameraControls.minDistance = 250
    this.cameraControls.maxDistance = 600
    this.cameraControls.maxPolarAngle = tMath.degToRad(60)
    this.cameraControls.update()

    /**
     *
     * @type {Gyroscope}
     */
    this.gyroscope = new Gyroscope()
    this.gyroscope.add(this.defaultScene.camera)
    this.gyroscope.add(this.defaultScene.light, this.defaultScene.light.target)
    this.model.add(this.gyroscope)

    this.speed = 50;
    this.angularSpeed = 0.5;
    this.bodyOrientation = 0;
  }

  update(delta) {
    this.bodyOrientation += delta * this.angularSpeed;
    let forwardDelta = this.speed * delta;

    this.model.position.x += Math.sin( this.bodyOrientation ) * forwardDelta;
    this.model.position.z += Math.cos( this.bodyOrientation ) * forwardDelta;
    this.model.rotation.y = this.bodyOrientation;
  }
}

export default ModelControls
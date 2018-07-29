import { Group, Object3D, Mesh, CubeGeometry, MeshBasicMaterial, Vector3, SphereGeometry } from 'three'
import DetectObject3D from '@helper/DetectObject3D'
import CANNON from 'cannon'

class Model extends Mesh {
  constructor() {
    super()

    /**
     *
     * @type {Object}
     */
    this.reference = null

    /**
     *
     * @type {boolean}
     */
    this.enableIntersect = true

    /**
     *
     * @type {Object3D}
     */
    this.decoration = new Object3D()

    /**
     *
     * @type {CANNON.Body}
     */
    this.boxBody = new CANNON.Body({mass: 1});
    this.boxBody.parent = this

    /**
     *
     * @type {Vector3}
     */
    this.size = new Vector3()

    /**
     *
     * @type {boolean}
     */
    this.enabled = false
  }

  /**
   *
   * @param {Object} value
   * @returns {Model}
   */
  setReference(value) {
    this.reference = value
    return this
  }

  /**
   *
   * @param {Object3D|Group|Mesh} model
   * @param {string} name
   * @param {number} [mass]
   * @returns {Model}
   */
  build(model, name, mass = 0) {
    this.name = name
    this.add(model)
    this.add(this.decoration)

    const maxSize = DetectObject3D.maxSize(model) * 1.6
    // const size = DetectObject3D.size(model)
    // this.geometry = new CubeGeometry(size.x, size.y, size.z)
    this.geometry = new SphereGeometry(maxSize, 32, 32)

    this.material = new MeshBasicMaterial({
      color: 0xFFFFFF,
      transparent: true,
      opacity: 0.02,
      depthWrite: false,
    })

    // let boxShape = new CANNON.Box(new CANNON.Vec3(size.x / 2, size.y, size.z / 2));

    let boxShape = new CANNON.Sphere(maxSize);
    this.boxBody.linearDamping = 0.5;
    this.boxBody.fixedRotation = true;
    this.boxBody.mass = mass;
    this.boxBody.updateMassProperties()
    this.boxBody.addShape(boxShape);
    this.enabled = true
    return this
  }

  /**
   *
   * @returns {Model}
   */
  updateModel() {
    if (this.enabled) {
      this.position.copy(this.boxBody.position)
    }
    return this
  }
}

export default Model
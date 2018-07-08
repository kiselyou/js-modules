import {Group, Object3D, Mesh, CubeGeometry, MeshBasicMaterial} from 'three'
import DetectObject3D from '@helper/DetectObject3D'

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
   * @returns {Model}
   */
  build(model, name) {
    this.name = name
    this.add(model)
    this.add(this.decoration)

    const size = DetectObject3D.size(model)
    this.geometry = new CubeGeometry(size.x, size.y, size.z)

    this.material = new MeshBasicMaterial({
      color: 0xFFFFFF,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    })

    return this
  }
}

export default Model
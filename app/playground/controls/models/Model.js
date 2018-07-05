import {Group, Object3D, Mesh, SphereGeometry, MeshBasicMaterial, BackSide} from 'three'
import DetectObject3D from '@helper/DetectObject3D'

class Model extends Mesh {
  constructor() {
    super()

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
   * @param {Object3D|Group|Mesh} model
   * @param {string} name
   * @returns {Model}
   */
  build(model, name) {
    this.name = name
    this.add(model)
    this.add(this.decoration)

    const size = DetectObject3D.size(model)
    const maxSize = Math.max(Math.max(size.x, size.y), size.z)

    this.geometry = new SphereGeometry(maxSize / 1.6, 30, 30)
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
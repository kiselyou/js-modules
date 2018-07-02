import { DoubleSide, Object3D, Group, Mesh, Vector3, RingGeometry, MeshBasicMaterial, BoxGeometry } from 'three'

class GunArea extends Group {
  constructor() {
    super()

    /**
     *
     * @type {number}
     */
    this.innerRadius = 1

    /**
     *
     * @type {number}
     */
    this.outerRadius = 300

    /**
     *
     * @type {number}
     */
    this.thetaSegments = 16

    /**
     *
     * @type {number}
     */
    this.phiSegments = 1

    /**
     *
     * @type {number}
     */
    this.thetaStart = - (Math.PI / 2)

    /**
     *
     * @type {number}
     */
    this.thetaLength = 1.4

    /**
     *
     * @type {Mesh}
     */
    this.mesh = new Mesh()

    /**
     *
     * @type {Vector3}
     */
    this.rightPoint = new Vector3()

    /**
     *
     * @type {Vector3}
     */
    this.leftPoint = new Vector3()
  }

  /**
   *
   * @param {number} value
   * @returns {GunArea}
   */
  setDistance(value) {
    this.outerRadius = value
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {GunArea}
   */
  setRadius(value) {
    this.thetaLength = value
    return this
  }

  /**
   * @returns {void}
   */
  async beforeStart() {
    const thetaStart = this.thetaStart - this.thetaLength / 2
    this.mesh.geometry = new RingGeometry(this.innerRadius, this.outerRadius, this.thetaSegments, this.phiSegments, thetaStart, this.thetaLength)
    this.mesh.material = new MeshBasicMaterial({color: 0xFFFFFF, side: DoubleSide, transparent: true, opacity: 0.05})
    this.mesh.rotateOnAxis(new Vector3(1, 0, 0), - Math.PI / 2)

    this.rightPoint.setX(this.outerRadius * Math.cos(thetaStart))
    this.rightPoint.setZ(this.outerRadius * Math.sin( - thetaStart))

    this.leftPoint.setX( - this.outerRadius * Math.cos(thetaStart))
    this.leftPoint.setZ(this.outerRadius * Math.sin( - thetaStart))

    const r = Math.atan2(this.rightPoint.z, this.rightPoint.x)
    const l = Math.atan2(this.leftPoint.z, this.leftPoint.x)

    // console.log(
    //   180*r/Math.PI,
    //   180*l/Math.PI,
    //   r, l
    // )


    // const x2 = - this.outerRadius * Math.cos(-thetaStart);
    // const z2 = this.outerRadius * Math.sin(-thetaStart);





    const geometry = new BoxGeometry(6, 6, 6)
    const material = new MeshBasicMaterial({color: 0xFF0000})
    const mesh = new Mesh(geometry, material)
    mesh.position.copy(this.rightPoint)

    this.add(mesh)

    const geometry2 = new BoxGeometry(6, 6, 6)
    const material2 = new MeshBasicMaterial({color: 0xFF0000})
    const mesh2 = new Mesh(geometry2, material2)
    mesh2.position.copy(this.leftPoint)

    this.add(mesh2)





    this.add(this.mesh)
  }
}

export default GunArea
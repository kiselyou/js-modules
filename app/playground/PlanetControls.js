import { SphereGeometry, MeshNormalMaterial, Mesh } from 'three'
import { randInt } from '@module/helper/Helper'

class PlanetControls {
  /**
   *
   * @param {Scene} scene
   */
  constructor(scene) {

    /**
     *
     * @type {Scene}
     */
    this.scene = scene

    /**
     *
     * @type {Array.<Mesh>}
     */
    this.planets = []
  }

  /**
   *
   * @returns {PlanetControls}
   */
  add() {
    const geometry = new SphereGeometry(0.2, 20, 20)
    const material = new MeshNormalMaterial()
    const mesh = new Mesh(geometry, material)
    mesh.position.z = - randInt(1, 16)
    mesh.position.x = randInt( - 6, 6)
    this.planets.push(mesh)
    this.scene.add(mesh)
    return this
  }

  update() {
    for (let mesh of this.planets) {
      mesh.rotation.x += 0.01
      mesh.rotation.y += 0.02
    }
  }
}

export default PlanetControls
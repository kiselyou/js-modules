import { Mesh, Vector3, MeshStandardMaterial, SphereGeometry, BackSide } from 'three'
import * as CONST from './../../constants'
import StarControls from './StarControls'

class SkyBoxControls {
  /**
   *
   * @param {Scene} scene
   * @param {Loader} loader
   */
  constructor(scene, loader) {
    /**
     *
     * @type {Scene}
     */
    this.scene = scene

    /**
     *
     * @type {Loader}
     */
    this.loader = loader

    /**
     *
     * @type {number}
     * @private
     */
    this._size = 1700

    /**
     *
     * @type {number}
     * @private
     */
    this.segments = 35

    /**
     *
     * @type {Mesh}
     */
    this.sky = new Mesh()

    /**
     *
     * @type {boolean}
     */
    this.enabled = false

    /**
     *
     * @type {StarControls}
     */
    this.starControls = new StarControls(this.sky)
  }

  /**
   *
   * @param {Loader} loader
   * @returns {void}
   */
  async beforeStart(loader) {
    this.sky.material = new MeshStandardMaterial({
      map: this.loader.getTexture(CONST.KEY_SECTOR_ALPHA),
      side: BackSide,
      depthWrite: false,
      roughness: 1,
      metalness: 0
    })

    this.sky.geometry = new SphereGeometry(this._size, this.segments, this.segments)
    this.sky.renderOrder = -100000
    this.scene.add(this.sky)
    await this.starControls.beforeStart(this.loader)
    this.enabled = true
  }

  /**
   *
   * @param {ParticlePlayGround} data
   * @returns {SkyBoxControls}
   */
  copy( data) {
    this.starControls.copy(data.getStars())
    return this
  }

  /**
   *
   * @param {number} delta
   * @param {Vector3} v
   * @returns {void}
   */
  update(delta, v) {
    if (this.enabled) {
      this.sky.position.copy(v)
      this.starControls.update(delta)
    }
  }
}

export default SkyBoxControls
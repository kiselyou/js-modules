import { Mesh, Vector3, MeshStandardMaterial, SphereGeometry, BackSide, AdditiveBlending, RepeatWrapping } from 'three'
import * as CONST from './../../constants'
import StarControls from './StarControls'

class SkyBoxControls {
  /**
   *
   * @param {Loader} loader
   */
  constructor(loader) {

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
  }

  /**
   *
   * @param {Loader} loader
   * @returns {void}
   */
  async beforeStart(loader) {

    const starTexture = this.loader.getTexture(CONST.KEY_SECTOR_ALPHA_STARS)
    starTexture.wrapT = RepeatWrapping
    starTexture.wrapS = RepeatWrapping
    starTexture.repeat.set( 3, 3 )

    const starsMaterial = new MeshStandardMaterial({
      map: starTexture,
      transparent: true,
      blending: AdditiveBlending,
      side: BackSide,
      depthWrite: false,
      roughness: 1,
      metalness: -0.3
    })

    const starsGeometry = new SphereGeometry(this._size * 1.2, this.segments, this.segments)
    const starsMesh = new Mesh(starsGeometry, starsMaterial)
    this.sky.add(starsMesh)

    this.sky.material = new MeshStandardMaterial({
      map: this.loader.getTexture(CONST.KEY_SECTOR_ALPHA),
      side: BackSide,
      depthWrite: false,
      roughness: 1,
      metalness: 0
    })

    this.sky.geometry = new SphereGeometry(this._size, this.segments, this.segments)
    this.sky.renderOrder = -100000
    this.enabled = true
  }

  /**
   *
   * @param {ParticlePlayGround} data
   * @returns {SkyBoxControls}
   */
  copy( data) {

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
    }
  }
}

export default SkyBoxControls
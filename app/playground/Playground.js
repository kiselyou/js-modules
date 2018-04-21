import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer
} from 'three'

import PlanetControls from './PlanetControls'

let i = 0

class Playground {
  constructor() {
    /**
     *
     * @type {Scene}
     */
    this.scene = new Scene()

    /**
     *
     * @type {string|?}
     */
    this.requestId = null

    /**
     *
     * @type {PerspectiveCamera}
     */
    this.camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10)

    /**
     *
     * @type {WebGLRenderer}
     */
    this.renderer = new WebGLRenderer({antialias: true})

    /**
     *
     * @type {PlanetControls}
     */
    this.planets = new PlanetControls(this.scene)
    this.planets
      .add().add().add()
      .add().add().add()
      .add().add().add()
  }

  /**
   *
   * @param {string} parentId
   * @param {string} canvasId
   * @returns {Playground}
   */
  init(parentId, canvasId) {
    this.renderer.domElement.id = canvasId
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.getElementById(parentId).appendChild(this.renderer.domElement)
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.camera.updateProjectionMatrix()
    });
    this.animateStart()
    return this
  }

  /**
   *
   * @returns {Playground}
   */
  animateStart() {
    this.planets.update()
    this.renderer.render(this.scene, this.camera)
    this.requestId = requestAnimationFrame(() => {
      this.animateStart()
    })
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
}

export default Playground
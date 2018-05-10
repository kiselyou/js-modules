import { Mesh, MeshStandardMaterial, Texture, SphereGeometry, Vector3, DoubleSide } from 'three'
import { randFloat } from '@module/helper/Helper'

class ModelPlanetClouds {
  constructor() {
    /**
     *
     * @type {number}
     */
    this.width = 1024

    /**
     *
     * @type {number}
     */
    this.height = 512

    /**
     *
     * @type {number}
     */
    this.cloudsSize = 0.6

    /**
     *
     * @type {Mesh}
     */
    this.clouds = new Mesh()

    /**
     *
     * @type {boolean}
     */
    this.enabled = false

    /**
     *
     * @type {Vector3}
     */
    this.speed = new Vector3(0.009, 0.009, 0.009)
  }

  updateSpeedClouds() {
    this.speed.set(
      randFloat(0.01, 0.05),
      randFloat(0.01, 0.05),
      randFloat(0.01, 0.05)
    )
  }

  /**
   * Build clouds of planet
   *
   * @param {number} planetRadius
   * @param {number} segments
   * @param {HTMLImageElement} imageMap
   * @param {HTMLImageElement} imageTrans
   * @returns {Mesh}
   */
  getMeshClouds(planetRadius, segments, imageMap, imageTrans) {
    let canvasResult = document.createElement('canvas')
    canvasResult.width = this.width
    canvasResult.height = this.height

    let contextResult = canvasResult.getContext('2d')

    this.clouds.material = new MeshStandardMaterial({
      map: new Texture(canvasResult),
      side: DoubleSide,
      transparent: true,
      opacity: 0.9
    })

    imageMap.addEventListener('load', () => {
      let canvasMap = document.createElement('canvas')
      canvasMap.width = imageMap.width
      canvasMap.height = imageMap.height
      let contextMap = canvasMap.getContext('2d')
      contextMap.drawImage(imageMap, 0, 0)
      let dataMap = contextMap.getImageData(0, 0, canvasMap.width, canvasMap.height)

      // create dataTrans ImageData for cloud map trans
      let canvasTrans = document.createElement('canvas')
      canvasTrans.width = imageTrans.width
      canvasTrans.height = imageTrans.height
      let contextTrans = canvasTrans.getContext('2d')
      contextTrans.drawImage(imageTrans, 0, 0)
      let dataTrans = contextTrans.getImageData(0, 0, canvasTrans.width, canvasTrans.height)
      // merge dataMap + dataTrans into dataResult
      let dataResult = contextMap.createImageData(canvasMap.width, canvasMap.height)
      for (let y = 0, offset = 0; y < imageMap.height; y++) {
        for (let x = 0; x < imageMap.width; x++, offset += 4) {
          dataResult.data[offset] = dataMap.data[offset]
          dataResult.data[offset + 1] = dataMap.data[offset + 1]
          dataResult.data[offset + 2] = dataMap.data[offset + 2]
          dataResult.data[offset + 3] = 255 - dataTrans.data[offset]
        }
      }

      contextResult.putImageData(dataResult, 0, 0)
      this.clouds.material.map.needsUpdate = true
    }, false)

    const radius = planetRadius + (planetRadius / 100 * this.cloudsSize)
    this.clouds.geometry = new SphereGeometry(radius, segments, segments)
    this.enabled = true
    return this.clouds
  }

  /**
   *
   * @param {number} delta
   * @returns {void}
   */
  update(delta) {
    if (this.enabled) {
      this.clouds.rotation.x += this.speed.x * delta
      this.clouds.rotation.y += this.speed.y * delta
      this.clouds.rotation.z += this.speed.z * delta
      this.updateSpeedClouds()
    }
  }
}

export default ModelPlanetClouds
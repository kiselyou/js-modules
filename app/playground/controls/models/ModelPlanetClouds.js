import { Mesh, MeshStandardMaterial, Texture, SphereGeometry, DoubleSide } from 'three'

class ModelPlanetClouds {
  /**
   *
   * @param {ModelPlanet} modelPlanet
   */
  constructor(modelPlanet) {
    /**
     *
     * @type {ModelPlanet}
     */
    this.modelPlanet = modelPlanet

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
     * @type {number}
     */
    this.speed = 0.005

    /**
     *
     * @type {boolean}
     */
    this.enabled = false
  }

  /**
   * Build clouds of planet
   *
   * @returns {Mesh}
   */
  buildClouds() {
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

    let imageMap = this.modelPlanet.getImageCloudMap()
    imageMap.addEventListener('load', () => {

      let canvasMap = document.createElement('canvas')
      canvasMap.width = imageMap.width
      canvasMap.height = imageMap.height
      let contextMap = canvasMap.getContext('2d')
      contextMap.drawImage(imageMap, 0, 0)
      let dataMap = contextMap.getImageData(0, 0, canvasMap.width, canvasMap.height)

      let imageTrans = this.modelPlanet.getImageCloudMapTrans()

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

    const size = this.modelPlanet.params.radius
    const radius = size + (size / 100 * this.cloudsSize)
    const segments = this.modelPlanet.params.segments
    this.clouds.geometry = new SphereGeometry(radius, segments, segments)
    this.modelPlanet.group.add(this.clouds)
    this.enabled = true
  }

  /**
   *
   * @param {number} delta
   * @returns {void}
   */
  update(delta) {
    this.clouds.rotation.x -= 0.005 * delta
    this.clouds.rotation.y += 0.005 * delta
    this.clouds.rotation.z -= 0.005 * delta
  }
}

export default ModelPlanetClouds
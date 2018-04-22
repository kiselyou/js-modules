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
     * @type {boolean}
     */
    this.enabled = false
  }

  /**
   * Build clouds of planet
   *
   * @private
   * @returns {Mesh}
   */
  buildClouds() {
    const canvasResult = document.createElement('canvas')
    canvasResult.width = this.width
    canvasResult.height = this.height
    const contextResult = canvasResult.getContext('2d')

    this.clouds.material = new MeshStandardMaterial({
      map: new Texture(canvasResult),
      side: DoubleSide,
      transparent: true,
      opacity: 0.8
    })

    // const imageMap = new Image()
    const imageMap = this.modelPlanet.loader.getImage(this.modelPlanet.params.texturesKey.cloudMap)
    // const imageMap = texture.image

    console.log(imageMap)

    imageMap.addEventListener('load', () => {
      console.log(1)

      // create dataMap ImageData for cloud map
      const canvasMap = document.createElement('canvas')
      canvasMap.width = imageMap.width
      canvasMap.height = imageMap.height
      const contextMap = canvasMap.getContext('2d')
      contextMap.drawImage(imageMap, 0, 0)
      const dataMap = contextMap.getImageData(0, 0, canvasMap.width, canvasMap.height)

      // load cloud map trans
      const imageTrans = this.modelPlanet.loader.getImage(this.modelPlanet.params.texturesKey.cloudMapTrans)
    console.log(imageTrans)
      imageTrans.addEventListener('load', () => {
        // create dataTrans ImageData for cloud map trans
        const canvasTrans = document.createElement('canvas')
        canvasTrans.width = imageTrans.width
        canvasTrans.height = imageTrans.height
        const contextTrans = canvasTrans.getContext('2d')
        contextTrans.drawImage(imageTrans, 0, 0)
        const dataTrans = contextTrans.getImageData(0, 0, canvasTrans.width, canvasTrans.height)
        //merge dataMap + dataTrans into dataResult
        const dataResult = contextMap.createImageData(canvasMap.width, canvasMap.height)
        for (let y = 0, offset = 0; y < imageMap.height; y++) {
          for (let x = 0; x < imageMap.width; x++, offset += 4) {
            dataResult.data[offset] = dataMap.data[offset]
            dataResult.data[offset + 1] = dataMap.data[offset + 1]
            dataResult.data[offset + 2] = dataMap.data[offset + 2]
            dataResult.data[offset + 3] = 255 - dataTrans.data[offset]
          }
        }
        // update texture with result
        contextResult.putImageData(dataResult, 0, 0)
        this.clouds.material.map.needsUpdate = true
        this.enabled = true
      })

      // imageTrans.src = this.modelPlanet.loader.getTexture(keyCloudMapTrans)
    }, false)

    // const keyCloudMap = this.modelPlanet.params.texturesKey.cloudMap
    // const texture = this.modelPlanet.loader.getTexture(keyCloudMap)
    // console.log(texture)
    // imageMap.src = this.modelPlanet.loader.getTexture(keyCloudMap)
    const radius = this.modelPlanet.params.radius
    console.log(radius)
    const cloudsRadius = radius + 2//(radius / 100 * this.cloudsSize)
    const segments = this.modelPlanet.params.segments
    this.clouds.geometry = new SphereGeometry(cloudsRadius, segments, segments)
    this.modelPlanet.planet.add(this.clouds)
  }

  update(delta) {
    this.clouds.rotation.x += 0.01// * delta;
    this.clouds.rotation.y += 0.01// * delta;
    this.clouds.rotation.z += 0.01// * delta;
  }
}

export default ModelPlanetClouds
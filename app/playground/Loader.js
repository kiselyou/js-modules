import { TextureLoader, ImageLoader } from 'three'
import TDSLoader from '@app/three-dependense/TDSLoader'
import * as CONST from '@app/constants'

class Loader {
  constructor(userInfo) {

    /**
     *
     * @type {TextureLoader}
     * @private
     */
    this._textureLoader = new TextureLoader()

    /**
     *
     * @type {ImageLoader}
     * @private
     */
    this._imageLoader = new ImageLoader()

    /**
     *
     * @type {TDSLoader}
     * @private
     */
    this._modelLoader = new TDSLoader()

    /**
     *
     * @type {Object}
     * @private
     */
    this._textures = {}

    /**
     *
     * @type {Object}
     * @private
     */
    this._images = {}

    /**
     *
     * @type {Object}
     */
    this._models = {}
  }

  /**
   *
   * @returns {Promise<void>}
   */
  async startLoad() {
    this._textures[CONST.KEY_LIGHT_CONTROLS_1] = await this._textureLoader.load('./app/web/images/light-controls/1.png')
    this._textures[CONST.KEY_LIGHT_CONTROLS_2] = await this._textureLoader.load('./app/web/images/light-controls/2.png')
    this._textures[CONST.KEY_LIGHT_CONTROLS_3] = await this._textureLoader.load('./app/web/images/light-controls/3.png')
    this._textures[CONST.KEY_LIGHT_CONTROLS_4] = await this._textureLoader.load('./app/web/images/light-controls/4.png')
    this._textures[CONST.KEY_LIGHT_CONTROLS_5] = await this._textureLoader.load('./app/web/images/light-controls/5.png')
    this._textures[CONST.KEY_LIGHT_CONTROLS_6] = await this._textureLoader.load('./app/web/images/light-controls/6.png')
    this._textures[CONST.KEY_LIGHT_CONTROLS_7] = await this._textureLoader.load('./app/web/images/light-controls/7.png')
    this._textures[CONST.KEY_LIGHT_CONTROLS_8] = await this._textureLoader.load('./app/web/images/light-controls/8.png')
    this._textures[CONST.KEY_LIGHT_CONTROLS_9] = await this._textureLoader.load('./app/web/images/light-controls/9.png')
    this._textures[CONST.KEY_LIGHT_CONTROLS_10] = await this._textureLoader.load('./app/web/images/light-controls/10.png')
    this._textures[CONST.KEY_LIGHT_CONTROLS_11] = await this._textureLoader.load('./app/web/images/light-controls/11.png')
    this._textures[CONST.KEY_LIGHT_CONTROLS_12] = await this._textureLoader.load('./app/web/images/light-controls/12.png')
    this._textures[CONST.KEY_LIGHT_CONTROLS_13] = await this._textureLoader.load('./app/web/images/light-controls/13.png')
    this._textures[CONST.KEY_LIGHT_CONTROLS_14] = await this._textureLoader.load('./app/web/images/light-controls/14.png')
    this._textures[CONST.KEY_LIGHT_CONTROLS_15] = await this._textureLoader.load('./app/web/images/light-controls/15.jpg')

    this._textures[CONST.KEY_PLANET_EARTH_MAP] = await this._textureLoader.load('./app/web/images/planets/earth/1k_earth_map.jpg')
    this._textures[CONST.KEY_PLANET_EARTH_BUMP] = await this._textureLoader.load('./app/web/images/planets/earth/1k_earth_bump.jpg')
    this._textures[CONST.KEY_PLANET_EARTH_SPEC] = await this._textureLoader.load('./app/web/images/planets/earth/1k_earth_spec.jpg')
    this._images[CONST.KEY_PLANET_EARTH_CLOUD_MAP] = await this._imageLoader.load('./app/web/images/planets/earth/1k_earth_cloud_map.jpg')
    this._images[CONST.KEY_PLANET_EARTH_CLOUD_MAP_TRANS] = await this._imageLoader.load('./app/web/images/planets/earth/1k_earth_cloud_map_trans.jpg')

    this._textures[CONST.KEY_PLANET_MOON_MAP] = await this._textureLoader.load('./app/web/images/planets/moon/1k_moon_map.jpg')
    this._textures[CONST.KEY_PLANET_MOON_BUMP] = await this._textureLoader.load('./app/web/images/planets/moon/1k_moon_bump.jpg')

    this._textures[CONST.KEY_PLANET_MARS_MAP] = await this._textureLoader.load('./app/web/images/planets/mars/1k_mars_map.jpg')
    this._textures[CONST.KEY_PLANET_MARS_BUMP] = await this._textureLoader.load('./app/web/images/planets/mars/1k_mars_bump.jpg')

    this._textures[CONST.KEY_SECTOR_ALPHA] = await this._textureLoader.load('./app/web/images/skybox/sector_alpha.jpg')

    this._models[CONST.KEY_SPACESHIP_1] = await this.loadModel('./app/web/models/spaceship/1/spaceship.3ds')
    this._models[CONST.KEY_SPACESHIP_2] = await this.loadModel('./app/web/models/spaceship/2/spaceship.3ds')
    this._models[CONST.KEY_SPACESHIP_3] = await this.loadModel('./app/web/models/spaceship/3/spaceship.3ds')
    this._models[CONST.KEY_SPACESHIP_4] = await this.loadModel('./app/web/models/spaceship/4/spaceship.3ds')
    this._models[CONST.KEY_SPACESHIP_5] = await this.loadModel('./app/web/models/spaceship/5/spaceship.3ds')
    this._models[CONST.KEY_SPACESHIP_6] = await this.loadModel('./app/web/models/spaceship/6/spaceship.3ds')
    this._models[CONST.KEY_SPACESHIP_7] = await this.loadModel('./app/web/models/spaceship/7/spaceship.3ds')
    this._models[CONST.KEY_SPACESHIP_8] = await this.loadModel('./app/web/models/spaceship/8/spaceship.3ds')
    this._models[CONST.KEY_SPACESHIP_9] = await this.loadModel('./app/web/models/spaceship/9/spaceship.3ds')
    // this._models[CONST.KEY_SPACESHIP_10] = await this.loadModel('./app/web/models/spaceship/10/spaceship.3ds')
    this._models[CONST.KEY_SPACESHIP_11] = await this.loadModel('./app/web/models/spaceship/11/spaceship.3ds')
    this._models[CONST.KEY_SPACESHIP_12] = await this.loadModel('./app/web/models/spaceship/12/spaceship.3ds')
  }

  /**
   *
   * @param {string} url
   * @returns {Promise<any>}
   */
  async loadModel(url) {
    return new Promise((resolve, reject) => {
      this._modelLoader.load(url, (model) => {
        resolve(model)
      }, undefined, reject)
    })
  }

  /**
   *
   * @param {string|number} key
   * @returns {Group|null}
   */
  getModel(key) {
    return this._models.hasOwnProperty(key) ? this._models[key] : null
  }

  /**
   *
   * @param {string} key
   * @returns {Texture|?}
   */
  getTexture(key) {
    return this._textures.hasOwnProperty(key) ? this._textures[key] : null
  }

  /**
   *
   * @param {string} key
   * @returns {HTMLImageElement|?}
   */
  getImage(key) {
    return this._images.hasOwnProperty(key) ? this._images[key] : null
  }
}

export default Loader
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
    this._textures[CONST.KEY_LIGHT_CONTROLS_1] = await this._textureLoader.load('./app/web/images/light/0.8k_1.jpg')
    this._textures[CONST.KEY_LIGHT_CONTROLS_2] = await this._textureLoader.load('./app/web/images/light/0.8k_2.jpg')
    this._textures[CONST.KEY_LIGHT_CONTROLS_3] = await this._textureLoader.load('./app/web/images/light/0.8k_3.jpg')
    this._textures[CONST.KEY_LIGHT_CONTROLS_4] = await this._textureLoader.load('./app/web/images/light/0.8k_4.jpg')
    this._textures[CONST.KEY_LIGHT_CONTROLS_5] = await this._textureLoader.load('./app/web/images/light/0.8k_5.jpg')
    this._textures[CONST.KEY_LIGHT_CONTROLS_6] = await this._textureLoader.load('./app/web/images/light/0.8k_6.jpg')
    this._textures[CONST.KEY_LIGHT_CONTROLS_9] = await this._textureLoader.load('./app/web/images/light/0.8k_9.jpg')
    this._textures[CONST.KEY_LIGHT_CONTROLS_11] = await this._textureLoader.load('./app/web/images/light/0.8k_11.jpg')
    this._textures[CONST.KEY_LIGHT_CONTROLS_13] = await this._textureLoader.load('./app/web/images/light/0.8k_13.jpg')
    this._textures[CONST.KEY_LIGHT_CONTROLS_14] = await this._textureLoader.load('./app/web/images/light/0.8k_14.jpg')
    this._textures[CONST.KEY_LIGHT_CONTROLS_15] = await this._textureLoader.load('./app/web/images/light/0.8k_15.jpg')


    this._textures[CONST.KEY_PLANET_SUN_MAP] = await this._textureLoader.load('./app/web/images/planets/sun/1k_sun_map.jpg')
    this._textures[CONST.KEY_PLANET_MOON_MAP] = await this._textureLoader.load('./app/web/images/planets/moon/1k_moon_map.jpg')
    this._textures[CONST.KEY_PLANET_MARS_MAP] = await this._textureLoader.load('./app/web/images/planets/mars/1k_mars_map.jpg')
    this._textures[CONST.KEY_PLANET_ERIS_MAP] = await this._textureLoader.load('./app/web/images/planets/eris/1k_eris_map.jpg')
    this._textures[CONST.KEY_PLANET_CERES_MAP] = await this._textureLoader.load('./app/web/images/planets/ceres/1k_ceres_map.jpg')
    this._textures[CONST.KEY_PLANET_EARTH_MAP] = await this._textureLoader.load('./app/web/images/planets/earth/1k_earth_map.jpg')
    this._textures[CONST.KEY_PLANET_VENUS_MAP] = await this._textureLoader.load('./app/web/images/planets/venus/1k_venus_map.jpg')
    this._textures[CONST.KEY_PLANET_HAUMEA_MAP] = await this._textureLoader.load('./app/web/images/planets/haumea/1k_haumea_map.jpg')
    this._textures[CONST.KEY_PLANET_NEPTUN_MAP] = await this._textureLoader.load('./app/web/images/planets/neptun/1k_uranus_map.jpg')
    this._textures[CONST.KEY_PLANET_SATURN_MAP] = await this._textureLoader.load('./app/web/images/planets/saturn/1k_saturn_map.jpg')
    this._textures[CONST.KEY_PLANET_URANUS_MAP] = await this._textureLoader.load('./app/web/images/planets/uranus/1k_neptune_map.jpg')
    this._textures[CONST.KEY_PLANET_JUPITER_MAP] = await this._textureLoader.load('./app/web/images/planets/jupiter/1k_jupiter_map.jpg')
    this._textures[CONST.KEY_PLANET_MERCURY_MAP] = await this._textureLoader.load('./app/web/images/planets/mercury/1k_mercury_map.jpg')
    this._textures[CONST.KEY_PLANET_MAKEMAKE_MAP] = await this._textureLoader.load('./app/web/images/planets/makemake/1k_makemake_map.jpg')




    this._textures[CONST.KEY_SECTOR_ALPHA] = await this._textureLoader.load('./app/web/images/skybox/sector_alpha.jpg')

    this._models[CONST.KEY_SPACESHIP_1] = await this.loadModel('./app/web/models/spaceship/1/spaceship.3ds')
    this._models[CONST.KEY_SPACESHIP_2] = await this.loadModel('./app/web/models/spaceship/2/spaceship.3ds')
    this._models[CONST.KEY_SPACESHIP_3] = await this.loadModel('./app/web/models/spaceship/3/spaceship.3ds')
    // this._models[CONST.KEY_SPACESHIP_4] = await this.loadModel('./app/web/models/spaceship/4/spaceship.3ds')
    // this._models[CONST.KEY_SPACESHIP_5] = await this.loadModel('./app/web/models/spaceship/5/spaceship.3ds')
    // this._models[CONST.KEY_SPACESHIP_6] = await this.loadModel('./app/web/models/spaceship/6/spaceship.3ds')
    // this._models[CONST.KEY_SPACESHIP_7] = await this.loadModel('./app/web/models/spaceship/7/spaceship.3ds')
    // this._models[CONST.KEY_SPACESHIP_8] = await this.loadModel('./app/web/models/spaceship/8/spaceship.3ds')
    // this._models[CONST.KEY_SPACESHIP_9] = await this.loadModel('./app/web/models/spaceship/9/spaceship.3ds')
    // this._models[CONST.KEY_SPACESHIP_10] = await this.loadModel('./app/web/models/spaceship/10/spaceship.3ds')
    // this._models[CONST.KEY_SPACESHIP_11] = await this.loadModel('./app/web/models/spaceship/11/spaceship.3ds')
    // this._models[CONST.KEY_SPACESHIP_12] = await this.loadModel('./app/web/models/spaceship/12/spaceship.3ds')

    this._models[CONST.KEY_STATION_1] = await this.loadModel('./app/web/models/station/1/station.3ds')
    this._models[CONST.KEY_STATION_2] = await this.loadModel('./app/web/models/station/2/station.3ds')
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
    return this._models.hasOwnProperty(key) ? this._models[key].clone() : null
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
import { TextureLoader } from 'three'
import * as CONST from '@app/constants'

class Loader {
  constructor() {
    /**
     *
     * @type {TextureLoader}
     * @private
     */
    this._textureLoader = new TextureLoader();

    /**
     *
     * @type {{}}
     * @private
     */
    this._textures = {}
  }

  /**
   *
   * @returns {Promise<void>}
   */
  async startLoad() {
    this._textures[CONST.KEY_LIGHT_CONTROLS_1] = await this._textureLoader.load('./app/web/images/light-controls/1.png')
    this._textures[CONST.KEY_LIGHT_CONTROLS_2] = await this._textureLoader.load('./app/web/images/light-controls/2.png')
  }

  /**
   *
   * @param {string} key
   * @returns {Texture|?}
   */
  getTexture(key) {
    return this._textures.hasOwnProperty(key) ? this._textures[key] : null
  }
}

export default Loader
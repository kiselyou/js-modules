import TextCanvas from './TextCanvas'
import { SpriteMaterial, Sprite, Vector3 } from 'three'

class MouseTooltip {
  constructor() {

    /**
     *
     * @type {TextCanvas}
     */
    this.text = new TextCanvas()

    /**
     *
     * @type {Sprite}
     */
    this.sprite = new Sprite(
      new SpriteMaterial({
        map: this.text.getTexture(),
      })
    )

    /**
     *
     * @type {Vector3}
     */
    this.scale = new Vector3(60, 60, 1)
  }

  /**
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {MouseTooltip}
   */
  setScale(x, y, z) {
    this.scale.set(x, y, z)
    return this
  }

  /**
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {MouseTooltip}
   */
  setPosition(x, y, z) {
    this.sprite.position.set(x, y, z)
    return this
  }

  /**
   *
   * @param {string} text
   * @returns {MouseTooltip}
   */
  write(text) {
    this.text.update(text)
    this.sprite.scale.copy(this.scale)
    this.sprite.material.map.needsUpdate = true
    return this
  }

  /**
   *
   * @returns {Sprite}
   */
  getSprite() {
    return this.sprite
  }
}

export default MouseTooltip
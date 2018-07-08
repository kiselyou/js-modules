import Shape from '@app/playground/decoration/canvas/Shape'
import { CanvasTexture, Sprite, SpriteMaterial } from 'three'

/**
 *
 * @param {Array.<Slot>} slots
 */
class TargetSpriteShot {
  constructor(slots) {
    /**
     * @type {Array.<Slot>}
     */
    this.slots = slots

    /**
     * @type {HTMLCanvasElement}
     */
    this.canvas = document.createElement('canvas')

    /**
     *
     * @type {Shape}
     */
    this.shapeTarget = new Shape(this.canvas)

    /**
     *
     * @type {number}
     */
    this.size = 512

    /**
     *
     * @type {number}
     */
    this.margin = 0

    /**
     *
     * @type {number}
     */
    this.spriteScale = 4
  }

  /**
   *
   * @returns {TargetSpriteShot}
   */
  draw() {
    const maxWidth = this.size * this.slots.length
    this.canvas.width = maxWidth
    this.canvas.height = this.size

    this.shapeTarget
      .squareForm(0, 0, maxWidth, this.size)
      .setBorder(2, 'transparent')

    const size = this.size - this.margin * 2
    for (let i = 0; i < this.slots.length; i++) {
      this.shapeTarget
        .addShape(
          new Shape(this.canvas)
            .squareForm(this.size * i + this.margin, this.margin, size, size, 12)
            .setBackgroundImage('./app/web/images/icon/rocket-slot-a.png')
        )
    }

    this.shapeTarget.build()
    return this
  }

  /**
   *
   * @returns {Sprite}
   */
  getSprite() {
    this.draw()
    const numberTexture = new CanvasTexture(this.canvas)
    const spriteMaterial = new SpriteMaterial({ map: numberTexture })
    const sprite = new Sprite(spriteMaterial)
    sprite.scale.set(this.spriteScale * this.slots.length, this.spriteScale, 1)
    return sprite
  }
}

export default TargetSpriteShot
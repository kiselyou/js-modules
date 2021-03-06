import Shape from '@app/playground/decoration/canvas/Shape'

class UserPanelSpeed {
  /**
   *
   * @param {HTMLCanvasElement} canvas
   * @param {CharacterControls} character
   */
  constructor(canvas, character) {
    /**
     *
     * @type {HTMLCanvasElement}
     */
    this.canvas = canvas

    /**
     * @type {CharacterControls}
     */
    this.character = character

    /**
     *
     * @type {Array.<Shape>}
     */
    this.shapes = []

    /**
     *
     * @type {number}
     */
    this.width = 85

    /**
     *
     * @type {number}
     */
    this.height = 85
  }

  /**
   *
   * @param {number} left
   * @param {number} top
   * @param {number} margin
   * @returns {UserPanelSpeed}
   */
  draw(left, top, margin) {
    const engine = this.character.spaceship.getEngine()
    if (!engine) {
      return this
    }

    const shape = new Shape(this.canvas)
    shape
      .squareForm(left, top, this.width - margin * 2, this.height - margin * 2)
      .setBorder(2, 'transparent')
      .addText('m/s', (text) => {
        text
          .setPaddingY(-20)
          .setFontSize('14px')
          .setHorizontalAlign('center')
          .setVerticalAlign('middle')
          .setFontColor('rgb(2, 145, 145)')
      })
      .addText(engine.speed.toFixed(1), (text) => {
        text
          .setFontSize('20px')
          .setHorizontalAlign('center')
          .setVerticalAlign('middle')
          .setFontColor('rgb(2, 145, 145)')
          .beforeBuild((text) => {
            text.attr.setText(engine.speed.toFixed(0))
          })
      })
      .build()

    this.shapes.push(shape)
    return this
  }

  /**
   *
   * @returns {UserPanelSpeed}
   */
  update() {
    for (const shape of this.shapes) {
      shape.build()
    }
    return this
  }
}

export default UserPanelSpeed
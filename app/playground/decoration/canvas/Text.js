import TextAttributes from '@app/playground/decoration/canvas/TextAttributes'

class Text {
  /**
   *
   * @param {HTMLCanvasElement} canvas
   */
  constructor(canvas) {
    /**
     *
     * @type {HTMLCanvasElement}
     */
    this.canvas = canvas

    /**
     *
     * @type {TextAttributes}
     */
    this.attr = new TextAttributes()

    /**
     *
     * @type {CanvasRenderingContext2D}
     */
    this.context = this.canvas.getContext('2d')
  }

  /**
   *
   * @param {?number} x
   * @param {?number} [y]
   * @return {Text}
   */
  setMargin(x, y) {
    this.attr.setMargin(x, y)
    return this
  }

  /**
   *
   * @param {?number} value
   * @return {Text}
   */
  setMarginX(value) {
    this.attr.setMarginX(value)
    return this
  }

  /**
   *
   * @param {?number} value
   * @return {Text}
   */
  setMarginY(value) {
    this.attr.setMarginY(value)
    return this
  }

  /**
   *
   * @param {string} value
   * @returns {Text}
   */
  setFontSize(value) {
    this.attr.setFontSize(value)
    return this
  }

  /**
   *
   * @param {string} value
   * @returns {Text}
   */
  setFontColor(value) {
    this.attr.setFontColor(value)
    return this
  }

  /**
   *
   * @param {string} value - Possible values "top|middle|bottom"
   * @returns {Text}
   */
  setVerticalAlign(value) {
    this.attr.setVerticalAlign(value)
    return this
  }

  /**
   *
   * @param {string} value - Possible values "left|center|right"
   * @returns {Text}
   */
  setHorizontalAlign(value) {
    this.attr.setHorizontalAlign(value)
    return this
  }

  /**
   *
   * @param {string|number} value
   * @param {number} startX
   * @param {number} startY
   * @param {number} width
   * @param {number} height
   * @returns {Text}
   */
  text(value, startX, startY, width, height) {
    this.attr
      .setText(value)
      .setStartX(startX)
      .setStartY(startY)
      .setWidth(width)
      .setHeight(height)

    return this
  }

  /**
   *
   * @param {boolean} [value]
   * @returns {Text}
   */
  wrap(value = true) {
    this.attr.wrapText(value)
    return this
  }

  /**
   *
   * @return {Text}
   */
  clear() {
    this.context.clearRect(this.attr.startX, this.attr.startY, this.attr.width, this.attr.height)
    return this
  }

  /**
   *
   * @return {Text}
   */
  remove() {
    this.clear()
    this.attr = new TextAttributes()
    return this
  }

  /**
   *
   * @return {Text}
   */
  rebuild() {
    this.clear().build()
    return this
  }

  /**
   *
   * @returns {Text}
   */
  build() {
    this.context.font = this.attr.font
    this.context.fillStyle = this.attr.fontColor
    this.context.textAlign = this.attr.horizontalAlign
    this.context.textBaseline = this.attr.verticalAlign

    if (this.attr.wrap) {
      this._buildWrappedText(this.attr.text, this.attr.positionX, this.attr.positionY)
    } else {
      this.context.fillText(this.attr.text, this.attr.positionX, this.attr.positionY)
    }

    return this
  }

  /**
   *
   * @param {string} text
   * @param {number} startX
   * @param {number} startY
   * @return {void}
   * @private
   */
  _buildWrappedText(text, startX, startY) {
    let line = ''
    const words = text.split(' ')
    for (let i = 0; i < words.length; i++) {

      const word = words[i]
      const testLine = line + word + ' '
      const testWidth = this.context.measureText(testLine).width

      if (testWidth > this.attr.width) {
        this.context.fillText(line, startX, startY)
        line = word + ' '
        startY += this.attr.fontSize.height
      } else {
        line = testLine;
      }
    }
    this.context.fillText(line, startX, startY);
  }
}

export default Text
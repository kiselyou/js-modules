import { Texture } from 'three'

class TextCanvas {
  constructor() {

    /**
     *
     * @type {number}
     */
    this.size = 80

    /**
     *
     * @type {string}
     */
    this.font = 'Arial'

    /**
     *
     * @type {string}
     */
    this.color = '#BBEB71'

    /**
     *
     * @type {string}
     */
    this.bold = 'bold'

    /**
     *
     * @type {string}
     * @private
     */
    this.align = 'center'

    /**
     *
     * @type {Element}
     */
    this.canvas = document.createElement('canvas')
    this.setWidth(1024)
    this.setHeight(1024)

    /**
     *
     * @type {CanvasRenderingContext2D}
     */
    this.context = this.canvas.getContext('2d');
  }

  /**
   *
   * @returns {TextCanvas}
   */
  alignCenter() {
    this.align = 'center';
    return this;
  }

  /**
   *
   * @returns {TextCanvas}
   */
  alignLeft() {
    this.align = 'left';
    return this;
  }

  /**
   *
   * @returns {TextCanvas}
   */
  alignRight() {
    this.align = 'right';
    return this;
  }

  /**
   *
   * @param {number} width
   * @returns {TextCanvas}
   */
  setWidth(width) {
    this.canvas.width = width;
    return this;
  }

  /**
   *
   * @param {number} height
   * @returns {TextCanvas}
   */
  setHeight(height) {
    this.canvas.height = height;
    return this;
  }

  /**
   *
   * @returns {Element}
   */
  getCanvas() {
    return this.canvas
  }

  /**
   *
   * @returns {Texture}
   */
  getTexture() {
    return new Texture(this.canvas)
  }

  /**
   *
   * @param {string|number} text
   * @returns {TextCanvas}
   */
  update(text) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.context.font = this.bold + ' ' + this.size + 'px ' + this.font
    this.context.fillStyle = this.color

    let
      x = 0,
      y = this.canvas.height / 2

    switch (this.align) {
      case 'right':
      case 'end':
        x = this.canvas.width
        break;
      case 'center':
        x = this.canvas.width / 2
        break;
    }

    this.context.textAlign = this.align
    this.context.fillText(text, x, y)
    return this
  }
}

export default TextCanvas
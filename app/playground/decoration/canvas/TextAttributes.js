
class TextAttributes {
  constructor() {
    /**
     *
     * @type {{size: string, height: number}}
     */
    this.fontSize = {size: '10px', height: this.getFontHeight('10px')}

    /**
     *
     * @type {string}
     */
    this.fontFamily = 'Audiowide'

    /**
     *
     * @type {string}
     */
    this.fontColor = '#FFFFFF'

    /**
     * Possible values "top|middle|bottom"
     *
     * @type {string}
     */
    this.verticalAlign = 'top'

    /**
     * Possible values "left|center|right"
     *
     * @type {string}
     */
    this.horizontalAlign = 'left'

    /**
     *
     * @type {?(string|number)}
     */
    this.text = null

    /**
     *
     * @type {number}
     */
    this.startX = 0

    /**
     *
     * @type {number}
     */
    this.startY = 0

    /**
     *
     * @type {number}
     */
    this.width = 0

    /**
     *
     * @type {number}
     */
    this.height = 0

    /**
     *
     * @type {boolean}
     */
    this.wrap = false

    /**
     *
     * @type {{x: number, y: number}}
     */
    this.padding = {x: 2, y: 0}
  }

  /**
   *
   * @param {string} font
   * @returns {number}
   */
  getFontHeight(font) {
    const parent = document.createElement('span')
    parent.appendChild(document.createTextNode('height'))
    document.body.appendChild(parent)
    parent.style.cssText = `font: ${font}; white-space: nowrap; display: inline;`
    const height = parent.offsetHeight
    document.body.removeChild(parent)
    return height;
  }

  /**
   *
   * @returns {string}
   */
  get font() {
    return `${this.fontSize.size} ${this.fontFamily}`
  }

  /**
   *
   * @returns {number}
   */
  get positionX() {
    switch (this.horizontalAlign) {
      case 'right':
      case 'end':
        return this.startX + this.width - this.padding.x
      case 'center':
        return (this.startX + this.width / 2) - this.padding.x
    }
    return this.startX + this.padding.x
  }

  /**
   *
   * @returns {number}
   */
  get positionY() {
    switch (this.verticalAlign) {
      case 'bottom':
      case 'end':
        return this.startY + this.height - this.padding.y
      case 'middle':
        return (this.startY + this.height / 2) - this.padding.y
    }
    return this.startY + this.padding.y
  }

  /**
   *
   * @param {?number} x
   * @param {?number} [y]
   * @return {TextAttributes}
   */
  setPadding(x, y) {
    this.setPaddingX(x)
    this.setPaddingY(y)
    return this
  }

  /**
   *
   * @param {?number} value
   * @return {TextAttributes}
   */
  setPaddingX(value) {
    this.padding.x = value || 0
    return this
  }

  /**
   *
   * @param {?number} value
   * @return {TextAttributes}
   */
  setPaddingY(value) {
    this.padding.y = value || 0
    return this
  }

  /**
   *
   * @param {boolean} value
   * @returns {TextAttributes}
   */
  wrapText(value) {
    this.wrap = value
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {TextAttributes}
   */
  setStartX(value) {
    this.startX = value
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {TextAttributes}
   */
  setStartY(value) {
    this.startY = value
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {TextAttributes}
   */
  setWidth(value) {
    this.width = value
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {TextAttributes}
   */
  setHeight(value) {
    this.height = value
    return this
  }

  /**
   *
   * @param {string} value
   * @returns {TextAttributes}
   */
  setFontSize(value) {
    this.fontSize = {size: value, height: this.getFontHeight(value)}
    return this
  }

  /**
   *
   * @param {?(string|number)} value
   * @returns {TextAttributes}
   */
  setText(value) {
    this.text = String(value)
    return this
  }

  /**
   *
   * @param {string} value
   * @returns {TextAttributes}
   */
  setFontFamily(value) {
    this.fontFamily = value
    return this
  }

  /**
   *
   * @param {string} value
   * @returns {TextAttributes}
   */
  setFontColor(value) {
    this.fontColor = value
    return this
  }

  /**
   *
   * @param {?string} value - Possible values "top|middle|bottom"
   * @returns {TextAttributes}
   */
  setVerticalAlign(value) {
    this.verticalAlign = value || 'top'
    return this
  }

  /**
   *
   * @param {?string} value - Possible values "left|center|right"
   * @returns {TextAttributes}
   */
  setHorizontalAlign(value) {
    this.horizontalAlign = value || 'left'
    return this
  }
}

export default TextAttributes
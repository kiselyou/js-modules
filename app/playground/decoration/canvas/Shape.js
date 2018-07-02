import ShapeAttributes from './ShapeAttributes'
import Text from './Text'

const images = {}

class Shape {
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
     * @type {ShapeAttributes}
     */
    this.attr = new ShapeAttributes()

    /**
     *
     * @type {CanvasRenderingContext2D}
     */
    this.shape = this.canvas.getContext('2d')

    /**
     *
     * @type {Array.<Text>}
     */
    this.childrenText = []

    /**
     *
     * @type {Array.<Shape>}
     */
    this.childrenShape = []

    /**
     * @param {Shape} shape
     * @callback beforeCallback
     */

    /**
     *
     * @type {?beforeCallback}
     */
    this.beforeBuildCallback = null
  }

  /**
   *
   * @param {beforeCallback} value
   * @returns {Shape}
   */
  beforeBuild(value) {
    this.beforeBuildCallback = value
    return this
  }

  /**
   * @param {Text} text
   * @callback textAttributesCallback
   */

  /**
   *
   * @param {string|number} value
   * @param {textAttributesCallback} [attributesCallback]
   * @return {Shape}
   */
  addText(value, attributesCallback) {
    const attr = this.attr
    const text = new Text(this.canvas).text(value, attr.startX, attr.startY, attr.width, attr.height)
    this.childrenText.push(text)

    if (attributesCallback) {
      attributesCallback(text)
    }
    return this
  }

  /**
   * @param {ShapeAttributes} attr
   * @callback shapeAttributesCallback
   */

  /**
   *
   * @param {Shape} shape
   * @return {Shape}
   */
  addShape(shape) {
    this.childrenShape.push(shape)
    return this
  }

  /**
   *
   * @param {MouseEvent} event
   * @returns {{x: number, y: number}}
   */
  getMousePosition(event) {
    const rect = this.canvas.getBoundingClientRect()
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    }
  }

  /**
   *
   * @param {{x: number, y: number}} mousePosition
   * @returns {boolean}
   */
  isIntersect(mousePosition) {
    if (this.attr.type === ShapeAttributes.SQUARE) {
      const { x, y } = mousePosition
      const isPositionX = x >= this.attr.startX && x <= (this.attr.startX + this.attr.width)
      const isPositionY = y >= this.attr.startY && y <= (this.attr.startY + this.attr.height)
      return isPositionX && isPositionY
    }
    return false
  }

  /**
   * @param {Shape} shape
   * @callback eventCallback
   */

  /**
   *
   * @param {MouseEvent} event
   * @param {eventCallback} callback
   * @returns {Shape}
   */
  onClickEvent(event, callback) {
    const mousePosition = this.getMousePosition(event)
    if (this.isIntersect(mousePosition)) {
      this.attr.active(!this.attr.isActive)
      callback(this)
    }
    return this
  }

  /**
   *
   * @param {number} weight
   * @param {string} [color]
   * @returns {Shape}
   */
  setBorder(weight, color) {
    this.attr.setBorderWeight(weight).setBorderColor(color)
    return this
  }

  /**
   *
   * @param {string} color
   * @returns {Shape}
   */
  setBorderColor(color) {
    this.attr.setBorderColor(color)
    return this
  }

  /**
   *
   * @param {string} color
   * @returns {Shape}
   */
  setBackground(color) {
    this.attr.setBackgroundColor(color)
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {Shape}
   */
  setOpacity(value) {
    this.attr.setOpacity(value)
    return this
  }

  /**
   *
   * @param {string} url
   * @param {?number} [padding]
   * @returns {Shape}
   */
  setBackgroundImage(url, padding) {
    this.attr.setBackgroundImage(url, padding)
    return this
  }

  /**
   * After calling this method, you need to set the necessary attributes and call the "draw ()" method to generate the form
   *
   * @example Build shape - const shape = new Shape(canvas).squareForm(2, 2, 36, 36, 4).setBorder(2).build()
   * @example Rebuild shape - shape.setBorder(6).rebuild()
   *
   * @param {number} startX
   * @param {number} startY
   * @param {number} width
   * @param {number} height
   * @param {number} [radius] - corner radius
   * @returns {Shape}
   */
  squareForm(startX, startY, width, height, radius = 1) {
    this.attr
      .setType(ShapeAttributes.SQUARE)
      .setStartX(startX)
      .setStartY(startY)
      .setWidth(width)
      .setHeight(height)
      .setRadius(radius)
    return this
  }

  /**
   *
   * @returns {Shape}
   */
  clear() {
    const border = this.attr.borderWeight || 0
    this.shape.clearRect(
      this.attr.startX - border,
      this.attr.startY - border,
      this.attr.width + border * 2,
      this.attr.height + border * 2
    )
    return this
  }

  /**
   *
   * @return {Shape}
   */
  remove() {
    this.clear()
    this.attr = new ShapeAttributes()
    return this
  }

  /**
   *
   * @returns {Promise<Shape>}
   */
  async build() {
    this.clear()
    this._beforeBuild()

    const attr = this.attr
    const shape = this.shape

    this.buildForm(shape, attr)

    if (attr.backgroundColor) {
      shape.fillStyle = attr.backgroundColor
      shape.fill()
    }
    if (attr.backgroundImage) {
      await this.loadImage(attr.backgroundImage)
        .then((img) => {
          const mg = attr.backgroundImagePadding
          shape.save()
          this.buildForm(shape, attr)
          shape.clip()
          shape.drawImage(img, attr.startX + mg, attr.startY + mg, attr.width - mg * 2, attr.height - mg * 2)
          shape.restore()
        })
    }
    if (attr.borderColor) {
      shape.strokeStyle = attr.borderColor
    }
    if (attr.borderWeight) {
      shape.lineWidth = attr.borderWeight
    }

    shape.globalAlpha = attr.opacity
    shape.stroke()

    for (const text of this.childrenText) {
      text.build()
    }

    for (const childrenShape of this.childrenShape) {
      await childrenShape.build()
    }

    return this
  }

  /**
   *
   * @param {CanvasRenderingContext2D} context
   * @param {ShapeAttributes} attr
   */
  buildForm(context, attr) {
    switch (attr.type) {
      case ShapeAttributes.SQUARE:
        this._buildSquare(context, attr)
        break
    }
  }

  /**
   *
   * @param {string} url
   * @returns {Promise<Image>}
   */
  async loadImage(url) {
    return new Promise((resolve) => {
      if (images.hasOwnProperty(url)) {
        resolve(images[url])
      } else {
        const img = new Image()
        img.src = url
        img.onload = () => {
          images[url] = img
          resolve(images[url])
        }
      }
    })
  }

  /**
   *
   * @param {CanvasRenderingContext2D} context
   * @param {ShapeAttributes} attr
   * @private
   */
  _buildSquare(context, attr) {
    const { startX, startY, width, height, radius } = attr
    context.beginPath()
    context.moveTo(startX + radius, startY)
    context.lineTo(startX + width - radius, startY)
    context.quadraticCurveTo(startX + width, startY, startX + width, startY + radius)
    context.lineTo(startX + width, startY + height - radius)
    context.quadraticCurveTo(startX + width, startY + height, startX + width - radius, startY + height)
    context.lineTo(startX + radius, startY + height)
    context.quadraticCurveTo(startX, startY + height, startX, startY + height - radius)
    context.lineTo(startX, startY + radius)
    context.quadraticCurveTo(startX, startY, startX + radius, startY)
    context.closePath()
  }

  /**
   *
   * @returns {Shape}
   * @private
   */
  _beforeBuild() {
    if (this.beforeBuildCallback) {
      this.beforeBuildCallback(this)
    }
    return this
  }
}

export default Shape
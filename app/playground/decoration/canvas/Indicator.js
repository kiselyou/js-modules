import Shape from './Shape'
import Text from './Text'

class Indicator extends Shape {
  /**
   *
   * @param {HTMLCanvasElement} canvas
   */
  constructor(canvas) {
    super(canvas)

    /**
     *
     * @type {string}
     */
    this.indicatorColor = 'rgb(255, 255, 255)'

    /**
     *
     * @type {string}
     */
    this.attr.backgroundColor = 'rgb(4, 27, 31)'

    /**
     *
     * @type {Shape}
     */
    this.indicator = new Shape(this.canvas)

    /**
     *
     * @type {Text}
     */
    this.indicatorLabel = new Text(this.canvas)
    this.indicatorLabel.setFontSize('10px').setFontColor('rgb(2, 145, 145)')

    /**
     *
     * @type {Text}
     */
    this.indicatorPercent = new Text(this.canvas)
    this.indicatorPercent.attr.setWidth(36)
    this.indicatorPercent.setFontSize('10px').setFontColor('rgb(2, 145, 145)')

    /**
     *
     * @type {?string}
     */
    this.label = null

    /**
     *
     * @type {number}
     */
    this.percent = 100

    /**
     *
     * @type {number}
     */
    this.percentDigits = 0
  }

  /**
   *
   * @param {string} value
   * @return {Indicator}
   */
  setIndicatorColor(value) {
    this.indicatorColor = value
    return this
  }

  /**
   *
   * @param {number} value
   * @return {Indicator}
   */
  setPercent(value) {
    value = value < 0 ? 0 : value
    value = value > 100 ? 100 : value
    this.percent = value
    return this
  }

  /**
   *
   * @param {number} value
   * @return {Indicator}
   */
  setPercentDigits(value) {
    this.percentDigits = value
    return this
  }

  /**
   *
   * @param {number} value
   * @return {Indicator}
   */
  increase(value) {
    this.percent += (this.percent + value) > 100 ? 0 : value
    return this
  }

  /**
   *
   * @param {number} value
   * @return {Indicator}
   */
  reduce(value) {
    this.percent -= (this.percent - value) < 0 ? 0 : value
    return this
  }

  /**
   *
   * @param {number} startX
   * @param {number} startY
   * @param {number} width
   * @param {number} height
   * @param {number} [labelWidth]
   * @param {?string} [label]
   * @return {Indicator}
   */
  horizontalLForm(startX, startY, width, height, labelWidth = 0, label = null) {
    if (labelWidth > 0) {
      this.indicatorLabel
        .text(label, startX, startY, labelWidth, height)
        .setHorizontalAlign('right')
        .setPadding(0, -2)
    }

    const percentWidth = this.indicatorPercent.attr.width

    this.indicatorPercent
      .text('', startX + labelWidth, startY, percentWidth, height)
      .setHorizontalAlign('left')
      .setPadding(4, -2)

    this.squareForm(startX + labelWidth + percentWidth, startY, width - labelWidth - percentWidth, height, 4)
    this.indicator.setBorder(-1, 'transparent')
    this.addShape(this.indicator)
    return this
  }

  /**
   *
   * @param {number} startX
   * @param {number} startY
   * @param {number} width
   * @param {number} height
   * @param {number} [labelWidth]
   * @param {?string} [label]
   * @return {Indicator}
   */
  horizontalRForm(startX, startY, width, height, labelWidth = 0, label = null) {
    if (labelWidth > 0) {
      this.indicatorLabel
        .text(label, width - labelWidth, startY, labelWidth, height)
        .setHorizontalAlign('left')
        .setPadding(6, -2)
    }

    const percentWidth = this.indicatorPercent.attr.width

    this.indicatorPercent
      .text('', width - percentWidth - labelWidth, startY, percentWidth, height)
      .setHorizontalAlign('left')
      .setPadding(6, -2)

    this.squareForm(startX, startY, width - percentWidth - labelWidth, height, 4)
    this.indicator.setBorder(-1, 'transparent')
    this.addShape(this.indicator)
    return this
  }

  clear() {
    this.indicatorLabel.clear()
    this.indicatorPercent.clear()
    super.clear()
    return this
  }

  /**
   *
   * @return {Promise<Indicator>}
   */
  async build() {
    this.clear()

    const attr = this.attr
    const borderWeight = Math.abs(attr.borderWeight)
    const x = attr.startX + borderWeight / 2
    const y = attr.startY + borderWeight / 2

    const percent = (attr.width - borderWeight) * this.percent / 100
    const showIndicatorValue = this.percent.toFixed(this.percentDigits)

    this.indicator
      .setBackground(this.indicatorColor)
      .squareForm(x, y, percent, attr.height - borderWeight, attr.radius / 2)

    await super.build()

    if (this.indicatorLabel.attr.width > 0) {
      this.indicatorPercent.attr.setText(`${showIndicatorValue}%`)
      this.indicatorPercent.build()
      this.indicatorLabel.build()
    }

    return this
  }
}

export default Indicator
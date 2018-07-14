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
    this.indicatorLabel.setFontSize('9px').setFontColor('rgb(2, 145, 145)')

    /**
     *
     * @type {Text}
     */
    this.indicatorLText = new Text(this.canvas)
    this.indicatorLText.setFontSize('9px').setFontColor('rgb(2, 145, 145)')

    /**
     *
     * @type {Text}
     */
    this.indicatorRText = new Text(this.canvas)
    this.indicatorRText.setFontSize('9px').setFontColor('rgb(2, 145, 145)')

    /**
     *
     * @type {Text}
     */
    this.indicatorPercent = new Text(this.canvas)
    this.indicatorPercent.attr.setWidth(45)
    this.indicatorPercent
      .setFontSize('9px')
      .setFontColor('rgb(2, 145, 145)')

    /**
     *
     * @type {number}
     */
    this.percent = 100

    /**
     *
     * @type {number}
     */
    this.percentDigits = 1
  }

  /**
   *
   * @param {string|number} value
   * @param {string} [fontSize]
   * @param {string} [color]
   * @returns {Indicator}
   */
  setLeftText(value, fontSize = '8px', color = '#000000') {
    this.indicatorLText.attr.setText(value)
    this.indicatorLText
      .setHorizontalAlign('left')
      .setVerticalAlign('middle')
      .setFontSize(fontSize)
      .setFontColor(color)
    return this
  }

  /**
   *
   * @param {string|number} value
   * @param {string} [fontSize]
   * @param {string} [color]
   * @returns {Indicator}
   */
  setRightText(value, fontSize = '8px', color = '#FFFFFF') {
    this.indicatorRText.attr.setText(value)
    this.indicatorRText
      .setHorizontalAlign('right')
      .setVerticalAlign('middle')
      .setFontSize(fontSize)
      .setFontColor(color)
    return this
  }

  /**
   * @param {Indicator} indicator
   * @callback beforeBuildCallback
   */

  /**
   *
   * @param {beforeBuildCallback} value
   * @returns {Indicator}
   */
  beforeBuild(value) {
    super.beforeBuild(value)
    return this
  }

  /**
   *
   * @param {number} weight
   * @param {string} [color]
   * @returns {Shape}
   */
  setBorder(weight, color) {
    if (weight > 0) {
      this.attr.width -= weight + 2
      this.attr.height -= weight
      this.attr.startX += weight + 2
      this.attr.startY += weight
    }
    super.setBorder(weight, color)
    return this
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
   * @returns {Indicator}
   */
  clear() {
    this.indicatorLabel.clear()
    this.indicatorPercent.clear()
    return this
  }

  /**
   *
   * @param {number} startX
   * @param {number} startY
   * @param {number} width
   * @param {number} height
   * @param {number} [border]
   * @return {Indicator}
   */
  horizontalForm(startX, startY, width, height, border = 0) {
    this.indicatorPercent.attr.setWidth(0)
    this.indicator.setBorder(-1, 'transparent')
    this.addShape(this.indicator)
    this.squareForm(startX, startY, width, height, border)
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
        .setHorizontalAlign('left')
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

  /**
   *
   * @return {Indicator}
   */
  build() {
    const attr = this.attr
    const x = attr.startX
    const y = attr.startY

    const mg = attr.borderWeight

    const percent = (attr.width - attr.borderWeight * 2) * this.percent / 100
    const showIndicatorValue = this.percent.toFixed(this.percentDigits)

    this.indicator
      .setBackground(this.indicatorColor)
      .squareForm(x + mg, y + mg / 2, percent, attr.height - attr.borderWeight, attr.radius / 2)

    super.build()

    const leftText = this.indicatorLText.attr.text
    if (leftText) {
      this.indicatorLText
        .text(leftText, attr.startX, attr.startY, attr.width, attr.height)
        .build()
    }

    const rightText = this.indicatorRText.attr.text
    if (rightText) {
      this.indicatorRText
        .text(leftText, attr.startX, attr.startY, attr.width, attr.height)
        .build()
    }

    if (this.indicatorLabel.attr.width > 0) {
      this.indicatorPercent.attr.setText(`${showIndicatorValue}%`)
      this.indicatorPercent.rebuild()
      this.indicatorLabel.rebuild()
    }

    return this
  }
}

export default Indicator
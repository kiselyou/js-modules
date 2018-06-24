import uuid from 'uuid/v4'

class ShapeAttributes {
  /**
   *
   * @param {string} [type]
   */
  constructor(type) {
    /**
     * @type {string}
     */
    this.uuid = uuid()

    /**
     *
     * @type {number}
     */
    this.opacity = 1

    /**
     *
     * @type {?string}
     */
    this.type = type ? type : ShapeAttributes.SQUARE

    /**
     *
     * @type {?number}
     */
    this.startX = null

    /**
     *
     * @type {?number}
     */
    this.startY = null

    /**
     *
     * @type {?number}
     */
    this.width = null

    /**
     *
     * @type {?number}
     */
    this.height = null

    /**
     *
     * @type {?number}
     */
    this.radius = null

    /**
     *
     * @type {?string}
     */
    this.borderColor = null

    /**
     *
     * @type {?number}
     */
    this.borderWeight = null

    /**
     *
     * @type {?string}
     */
    this.backgroundColor = null

    /**
     *
     * @type {?string}
     */
    this.backgroundImage = null

    /**
     *
     * @type {?number}
     */
    this.backgroundImageMargin = null

    /**
     *
     * @type {boolean}
     */
    this.isActive = false
  }

  /**
   *
   * @param {boolean} value
   * @returns {ShapeAttributes}
   */
  active(value) {
    this.isActive = value
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {ShapeAttributes}
   */
  setOpacity(value) {
    this.opacity = value
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {ShapeAttributes}
   */
  setStartX(value) {
    this.startX = value
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {ShapeAttributes}
   */
  setStartY(value) {
    this.startY = value
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {ShapeAttributes}
   */
  setWidth(value) {
    this.width = value
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {ShapeAttributes}
   */
  setHeight(value) {
    this.height = value
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {ShapeAttributes}
   */
  setRadius(value) {
    this.radius = value
    return this
  }

  /**
   *
   * @param {number} value
   * @returns {ShapeAttributes}
   */
  setBorderWeight(value) {
    this.borderWeight = value
    return this
  }

  /**
   *
   * @param {string} value
   * @returns {ShapeAttributes}
   */
  setType(value) {
    this.type = value
    return this
  }

  /**
   *
   * @param {string} value
   * @returns {ShapeAttributes}
   */
  setBorderColor(value) {
    this.borderColor = value
    return this
  }

  /**
   *
   * @param {string} value
   * @returns {ShapeAttributes}
   */
  setBackgroundColor(value) {
    this.backgroundColor = value
    return this
  }

  /**
   *
   * @param {string} url
   * @param {?number} [margin]
   * @returns {ShapeAttributes}
   */
  setBackgroundImage(url, margin = null) {
    this.backgroundImage = url
    this.backgroundImageMargin = margin
    return this
  }

  /**
   *
   * @returns {string}
   */
  static get SQUARE() {
    return 'SQUARE'
  }
}

export default ShapeAttributes
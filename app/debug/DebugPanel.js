import gui from 'dat.gui'

class DebugPanel {
  constructor() {
    /**
     *
     * @type {boolean}
     */
    this.disabled = false

    /**
     *
     * @type {GUI}
     */
    this.gui = new gui.GUI()

    /**
     *
     * @type {Array.<dat.gui.GUI>}
     */
    this.folders = []

    /**
     *
     * @type {Array}
     */
    this.events = []
  }

  /**
   * @param {*} value
   * @callback onChangeLister
   */

  /**
   *
   * @param {onChangeLister} listener
   * @returns {DebugPanel}
   */
  addEventOnChange(listener) {
    this.events.push(listener)
    return this
  }

  /**
   *
   * @param {String} name
   * @returns {DebugPanel}
   */
  addFolder(name) {
    if (this.disabled) {
      return this
    }
    const folder = this.gui.addFolder(name)
    this.folders.push(folder)
    return this
  }

  /**
   *
   * @param {Object} props
   * @param {string} key
   * @param {string} [name]
   * @param {(number|null)} [minValue]
   * @param {(number|null)} [maxValue]
   * @param {boolean} [isColor]
   * @returns {DebugPanel}
   */
  add(props, key, name, minValue, maxValue, isColor = false) {
    this.gui.remember(props)
    if (this.disabled) {
      return this
    }
    if (this.folders.length === 0) {
      this.addFolder('Unknown folder')
    }

    const folder = this.folders[this.folders.length - 1]

    let controller = null
    if (isColor) {
      controller = folder.addColor(props, key, minValue, maxValue).name(name).listen()
    } else {
      controller = folder.add(props, key, minValue, maxValue).name(name).listen()
    }

    controller.onChange((value) => {
      for (const event of this.events) {
        event(value)
      }
    })

    return this
  }

  /**
   *
   * @returns {void}
   */
  open() {
    if (this.disabled) {
      return
    }
    for (const folder of this.folders) {
      folder.open()
    }
  }
}

export default DebugPanel
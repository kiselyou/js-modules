import Shape from './canvas/Shape'
// import Indicator from './canvas/Indicator'
import Slot from '@entity/particles-spaceship/Slot'

import UserPanelShot from './UserPanelShot'
import UserPanelSpeed from './UserPanelSpeed'
import UserPanelIndicator from './UserPanelIndicator'

class UserPanel {
  /**
   *
   * @param {CharacterControls} character
   */
  constructor(character) {
    /**
     * @type {CharacterControls}
     */
    this.character = character

    /**
     *
     * @type {HTMLCanvasElement}
     */
    this.canvas = document.createElement('canvas')

    /**
     *
     * @type {UserPanelIndicator}
     */
    this.panelIndicator = new UserPanelIndicator(this.canvas, character)

    /**
     *
     * @type {UserPanelSpeed}
     */
    this.panelSpeed = new UserPanelSpeed(this.canvas, character)

    /**
     *
     * @type {UserPanelShot}
     */
    this.panelShot = new UserPanelShot(this.canvas, character)
  }

  /**
   *
   * @returns {UserPanel}
   */
  prepareCanvas() {
    this.canvas.style.position = 'absolute'
    this.canvas.style.bottom = '4px'
    this.canvas.style.left = '2px'
    this.canvas.height = this.panelSpeed.height
    this.canvas.width = this.panelShot.maxCount * this.panelShot.size + this.panelSpeed.width
    return this
  }

  /**
   *
   * @return {Promise<UserPanel>}
   */
  async drawMainPanel() {
    this.prepareCanvas()
    const top = 46
    const left = this.panelShot.margin
    const width = (this.panelShot.maxCount * this.panelShot.size) - (this.panelShot.margin * 2)
    await this.panelIndicator.draw(left, top, width)
    return this
  }

  /**
   *
   * @return {Promise<UserPanel>}
   */
  async drawSpeedPanel() {
    const top = this.panelShot.margin
    const left = (this.panelShot.maxCount * this.panelShot.size) + this.panelShot.margin
    await this.panelSpeed.draw(left, top, this.panelShot.margin)
    return this
  }

  /**
   *
   * @return {Promise<UserPanel>}
   */
  async drawShotPanel() {
    await this.panelShot.draw(0, 0)
  }

  /**
   *
   * @returns {Promise<UserPanel>}
   */
  async update() {
    await this.panelIndicator.update()
    await this.panelSpeed.update()
    return this
  }
}

export default UserPanel
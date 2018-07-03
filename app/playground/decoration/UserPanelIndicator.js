import Indicator from '@app/playground/decoration/canvas/Indicator'

class UserPanelIndicator {
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
     * @type {Indicator}
     */
    this.indicator = new Indicator(this.canvas)

    /**
     *
     * @type {number}
     */
    this.indicatorHeight = 8

    /**
     *
     * @type {number}
     */
    this.indicatorMargin = 4

    /**
     *
     * @type {number}
     */
    this.labelWidth = 50

    this.options = [
      {
        color: '#F00',
        label: 'Healthy:',
        entity: () => this.character.spaceship.getShell()
      },
      {
        color: '#0037FF',
        label: 'Energy:',
        entity: () => this.character.spaceship.getEnergy()
      },
      {
        color: '#FFF',
        label: 'Armor:',
        entity: () => this.character.spaceship.getArmor()
      }
    ]
  }

  /**
   *
   * @param {number} left
   * @param {number} top
   * @param {number} indicatorWidth
   * @returns {Promise<void>}
   */
  async draw(left, top, indicatorWidth) {
    for (let i = 0; i < this.options.length; i++) {
      const item = this.options[i]
      const x = left
      const y = top + i * (this.indicatorHeight + this.indicatorMargin)

      await this.indicator
        .horizontalLForm(x, y, indicatorWidth, this.indicatorHeight, this.labelWidth, item.label)
        .setBorder(2, 'rgb(2, 145, 145)')
        .setIndicatorColor(item.color)
        .beforeBuild((shape) => {
          const entity = item.entity()
          shape.setPercent(entity.state)
        })
        .build()
    }
  }

  /**
   *
   * @returns {Promise<UserPanelIndicator>|void}
   */
  async update() {
    await this.indicator.build()
    return this
  }
}

export default UserPanelIndicator
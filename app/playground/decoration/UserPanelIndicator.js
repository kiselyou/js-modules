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
     * @type {Array.<{key: number, indicator: Indicator}>}
     */
    this.indicators = []

    /**
     *
     * @type {number}
     */
    this.indicatorHeight = 6

    /**
     *
     * @type {number}
     */
    this.indicatorMargin = 4

    /**
     *
     * @type {number}
     */
    this.labelWidth = 75

    this.options = [
      {
        key: 1,
        color: '#F00',
        label: 'Healthy:',
        entity: () => this.character.spaceship.getShell()
      },
      {
        key: 2,
        color: 'rgb(250, 200, 60)',
        label: 'Shell energy:',
        entity: () => this.character.spaceship.getArmor()
      },
      {
        key: 3,
        color: 'rgb(250, 250, 250)',
        label: 'Shot energy:',
        entity: () => this.character.spaceship.getEnergy()
      },
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

      const indicator = new Indicator(this.canvas)
      await indicator
        .horizontalLForm(x, y, indicatorWidth, this.indicatorHeight, this.labelWidth, item.label)
        .setBorder(2, 'rgb(2, 145, 145)')
        .setIndicatorColor(item.color)
        .beforeBuild((shape) => {
          const entity = item.entity()
          shape.setPercent(entity.state)
        })
        .build()

      this.indicators.push({key: item.key, indicator})
    }
  }

  /**
   *
   * @param {Array.<number>} keys - possible values (1 - Healthy, 2 - Energy, 3)
   * @returns {Promise<UserPanelIndicator>|void}
   */
  async update(keys = []) {
    if (keys.length === 0) {
      for (const item of this.indicators) {
        await item.indicator.build()
      }
    } else {
      for (const key of keys) {
        const indicator = this.indicators.find((item) => {
          return item.key === key
        })
        if (!indicator) {
          continue
        }
        await indicator.build()
      }
    }
    return this
  }
}

export default UserPanelIndicator
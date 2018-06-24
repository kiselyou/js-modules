import Shape from './canvas/Shape'
import Indicator from './canvas/Indicator'
import Slot from '@entity/particles-spaceship/Slot'

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
     * @type {CanvasRenderingContext2D}
     */
    this.context = this.canvas.getContext('2d')

    /**
     *
     * @type {Array.<Shape>}
     */
    this.buttons = []

    /**
     *
     * @type {number}
     */
    this.sizeSpeedItem = 85

    /**
     *
     * @type {number}
     */
    this.sizeShotItem = 40

    /**
     *
     * @type {number}
     */
    this.maxCountShotItem = 10

    /**
     *
     * @type {number}
     */
    this.marginShotItem = 2
  }

  /**
   *
   * @returns {UserPanel}
   */
  prepareCanvas() {
    this.canvas.style.position = 'absolute'
    this.canvas.style.bottom = '4px'
    this.canvas.style.left = '2px'
    this.canvas.height = this.sizeSpeedItem
    this.canvas.width = this.maxCountShotItem * this.sizeShotItem + this.sizeSpeedItem
    return this
  }

  /**
   *
   * @return {Promise<UserPanel>}
   */
  async drawMainPanel() {
    this.prepareCanvas()
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const y = 46
    const height = 8
    const margin = 4
    const labelWidth = 50

    const options = [
      {
        color: '#F00',
        label: 'Healthy:',
        percent: 10
      },
      {
        color: '#0037FF',
        label: 'Energy:',
        percent: 45
      },
      {
        color: '#FFF',
        label: 'Armor:',
        percent: 90
      }
    ]

    for (let i = 0; i < options.length; i++) {

      const item = options[i]
      const top = y + i * (height + margin)
      const width = (this.maxCountShotItem * this.sizeShotItem) - (this.marginShotItem * 2)

      const test = await new Indicator(this.canvas)
        .horizontalLForm(this.marginShotItem, top, width, height, labelWidth, item.label)
        .setBorder(2, 'rgb(2, 145, 145)')
        .setIndicatorColor(item.color)
        .setPercent(item.percent)
        .build()

      // setInterval(async () => {
      //   await test.increase(0.1).rebuild()
      // }, i * 10)
    }

    return this
  }

  async drawSpeedPanel() {
    const shape = new Shape(this.canvas)

    const width = (this.maxCountShotItem * this.sizeShotItem) + this.marginShotItem

    await shape
      .squareForm(width, this.marginShotItem, this.sizeSpeedItem - this.marginShotItem * 2, this.sizeSpeedItem - this.marginShotItem * 2)
      .setBorder(2, 'transparent')
      // .setBackground('rgb(4, 27, 31)')
      .addText('speed', (attr) => {
        attr
          .setMarginY(25)
          .setFontSize('10px')
          .setHorizontalAlign('center')
          .setVerticalAlign('bottom')
          .setFontColor('rgb(2, 145, 145)')
      })
      .addText('186mh', (attr) => {
        attr
          .setFontSize('22px')
          .setHorizontalAlign('center')
          .setVerticalAlign('bottom')
          .setFontColor('rgb(2, 145, 145)')
      })
      .build()
  }

  /**
   *
   * @return {Promise<UserPanel>}
   */
  async drawShotPanel() {
    const slots = this.character.spaceship.getSlotsByType(Slot.TYPE_GUN)

    const mg = this.marginShotItem
    const size = this.sizeShotItem - mg * 2
    for (let i = mg, num = 0; i < (this.maxCountShotItem * this.sizeShotItem + mg); i += this.sizeShotItem, num++ ) {
      const slot = slots[num]

      const shape = new Shape(this.canvas)
        .squareForm(i, mg, size, size, 0)
        .addText(num + 1, (attr) => {
          attr.setHorizontalAlign('right').setMargin(4, 2)
        })

      if (slot) {
        shape
          .setBorder(2, 'rgb(2, 145, 145)')
          .setBackgroundImage('./app/web/images/icon/rocket-png-19.png', 4);
        this.buttons.push(shape)
      } else {
        shape
          .setBorder(2, 'rgb(105, 105, 105)')
          .setBackground('rgba(21, 21, 21, 0.6)')
      }

      await shape.build()
    }

    return this
  }

  /**
   *
   * @param {MouseEvent} event
   * @return {UserPanel}
   */
  onMouseClick(event) {
    for (const button of this.buttons) {
      button.onClickEvent(event, async (shape) => {
        const activeColor = shape.attr.isActive ? 'rgb(205, 205, 205)' : 'rgb(2, 145, 145)'
        await shape.setBorderColor(activeColor).rebuild()
      })
    }
    return this
  }
}

export default UserPanel
import Shape from '@app/playground/decoration/canvas/Shape'
import Slot from '@entity/particles-spaceship/Slot'
import Indicator from '@app/playground/decoration/canvas/Indicator'

class UserPanelShot {
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
     * @type {number}
     */
    this.size = 40

    /**
     *
     * @type {number}
     */
    this.maxCount = 10

    /**
     *
     * @type {number}
     */
    this.margin = 2

    /**
     *
     * @type {Array.<{shape: Shape, slot: Slot}>}
     */
    this.buttons = []

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
  }

  /**
   *
   * @returns {UserPanelShot}
   */
  draw() {
    const slots = this.character.spaceship.getSlotsByType(Slot.TYPE_GUN)

    const size = this.size - this.margin * 2
    for (let i = this.margin, num = 0; i < (this.maxCount * this.size + this.margin); i += this.size, num++ ) {
      const slot = slots[num]
      const shape = new Shape(this.canvas)
        .squareForm(this.startX + i, this.startY + this.margin, size, size, 2)
        .addText(num + 1, (text) => {
          text.setHorizontalAlign('right').setPadding(4, 2)
        })

      if (slot) {
        slot.onChangeStatus((slot) => {
          switch (slot.status) {
            case Slot.STATUS_ACTIVE:
              shape
                .setBackground('rgb(50, 50, 50)')
                .setBorder(2, 'rgb(0, 85, 85)')
                .build()
              break;
            case Slot.STATUS_SELECTED:
              shape
                .setBackground('rgb(21, 21, 21)')
                .setBorder(2, 'rgb(205, 205, 205)')
                .build()
              break;
            case Slot.STATUS_ENABLED:
            default:
              shape
                .setBackground('rgb(21, 21, 21)')
                .setBorder(2, 'rgb(2, 145, 145)')
                .build()
              break;
          }
        })

        shape
          .setBorder(2, 'rgb(2, 145, 145)')
          .setBackground('rgb(21, 21, 21)')
          .setBackgroundImage('./app/web/images/icon/rocket-slot-a.png', 6)
          .addShape(
            new Indicator(this.canvas)
              .horizontalForm(this.startX + i, this.startY + this.margin + size - 6, size - 4, 4)
              .setBorder(1, 'rgb(2, 145, 145)')
              .setIndicatorColor('#FFFF00')
              .beforeBuild((indicator) => {
                indicator.setPercent(slot.particle.rechargeStatePercent)
              })
          )

        this.buttons.push({shape, slot})
      } else {
        shape
          .setBorder(2, 'rgb(105, 105, 105)')
          .setBackground('rgba(21, 21, 21, 0.6)')
      }

      shape.build()
    }

    return this
  }

  /**
   * @param {Slot} slot
   * @param {Shape} shape
   * @callback clickCallback
   */

  /**
   *
   * @param {MouseEvent} event
   * @param {clickCallback} clickCallback
   * @return {UserPanelShot}
   */
  onMouseClick(event, clickCallback) {
    for (const button of this.buttons) {
      button.shape.onClickEvent(event, (shape) => {
        clickCallback(button.slot, shape)
      })
    }
    return this
  }

  /**
   *
   * @param {Gun} gun
   * @returns {void}
   */
  rebuild(gun) {
    const item = this.buttons.find((item) => item.slot.particle.id === gun.id)
    if (item) {
      item.shape.build()
    }
  }
}

export default UserPanelShot
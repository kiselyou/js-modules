
/**
 *
 * @param {Tooltip} tooltip
 * @returns {string}
 */
export const templateTooltipInfo = (tooltip) => {
  const model = tooltip.target.reference
  const position = tooltip.target.position
  const distance = tooltip.playground.character.model.position.distanceTo(position)
  return `
    <div class="tooltip__content tooltip__bordered">
      <div class="tooltip__title">
        <b>${model.name}</b>
      </div>
      <div class="tooltip__body">
        <b>Description: </b>
        ${model.description || ''}
      </div>
      <b>Distance: </b>${distance.toFixed(0)}<br/>
      <b>Position: </b>
      x - ${position.x.toFixed(0)}, 
      z - ${position.z.toFixed(0)}
    </div>
  `
}

/**
 *
 * @param {Tooltip|TooltipShot} tooltip
 * @returns {string}
 */
export const templateTooltipShot = function (tooltip) {
  let htmlSlots = ''
  for (const slot of tooltip.slots) {
    htmlSlots += `
      <div class="target-slot__item">
        <img src="/app/web/images/icon/rocket-slot-a.png" class="target-slot__img">
      </div>
    `
  }

  let side = ''
  switch (tooltip.side) {
    case 1:
      side = 'target-slot__left'
      break
    case 2:
      side = 'target-slot__top'
      break
    case 3:
      side = 'target-slot__right'
      break
    case 4:
      side = 'target-slot__bottom'
      break
  }

  return `
    <div class="tooltip__context">
      <div class="tooltip__content_flex ${side}">
        ${htmlSlots}
      </div>
    </div>
  `
}
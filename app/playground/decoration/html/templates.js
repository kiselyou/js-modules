
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
 * @param {Tooltip} tooltip
 * @returns {string}
 */
export const templateTooltipShot = function (tooltip) {
  // console.log(tooltip.slots)
  let htmlSlots = ''
  for (const slot of tooltip.slots) {
    htmlSlots += `
      <div class="target-slot">
        <img src="/app/web/images/icon/rocket-slot-a.png" class="target-slot__img">
      </div>
    `
  }

  return `
    <div class="tooltip__context tooltip__content_flex">
      ${htmlSlots}
    </div>
  `
}
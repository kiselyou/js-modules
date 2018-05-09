
class HelperSector {
  constructor() {

  }

  /**
   *
   * @param {Array.<Sector>} sectors
   * @param {string} id
   */
  getSwapInfoById(sectors, id) {
    const sector = sectors.find((sector) => {
      return sector.id === id
    })
    if (sector) {
      return sector.getSwapInfo()
    }
    return null
  }
}

export default HelperSector
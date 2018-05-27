import HelperSector from './../../entity/sector/helper/HelperSector'
import PlayGroundUniverse from './../repository/PlayGroundUniverse'
import PlayGroundSector from './../repository/PlayGroundSector'
import SpaceTimer from '../../helper/SpaceTimer'
import SwapInfo from '../../helper/SwapInfo'
import { Clock } from 'three'


class PlayGroundTimer {
  constructor() {
    /**
     *
     * @type {number}
     */
    this.fps = 1000 / 60

    /**
     *
     * @type {Clock}
     */
    this.clock = new Clock();

    /**
     *
     * @type {SpaceTimer}
     */
    this.spaceTimer = new SpaceTimer()

    /**
     *
     * @type {HelperSector}
     */
    this.helperSector = new HelperSector()

    /**
     *
     * @type {PlayGroundUniverse}
     */
    this.playGroundUniverse = new PlayGroundUniverse()

    /**
     * @type {Universe|?}
     */
    this.universe = null

    this.playGroundUniverse.findSectors((universe) => {
      this.universe = universe
    })

    /**
     *
     * @type {PlayGroundSector}
     */
    this.playGroundSector = new PlayGroundSector()

    /**
     *
     * @type {Array<Sector>}
     */
    this.sectors = []

    this.playGroundSector.findSectors((sectors) => {
      this.sectors = sectors;
    })
  }

  /**
   * @callback startLiveCallback
   */

  /**
   *
   * @param {startLiveCallback} startLiveCallback
   */
  onLiveStart(startLiveCallback) {
    if ( ! this.universe) {
      setTimeout(() => {
        this.onLiveStart(startLiveCallback)
      }, 1000)
      return
    }
    this.liveStart()
    startLiveCallback()
  }

  /**
   *
   * @private
   * @returns {void}
   */
  liveStart() {
    // Расчет движения елементов в секторах
    setInterval(() => {
      let delta = this.clock.getDelta();
      this.playGroundSector.update(delta, this.sectors)
    }, this.fps)

    // Обновление данных В БД
    this.spaceTimer
    .setTimestamp(this.universe.timestamp)
      .eachMinute((eventData) => {
        this.playGroundUniverse.updateTimestamp(eventData.timestamp)
        this.playGroundSector.updateSectorsInfo(this.sectors)
      })
      .startTimer()
  }

  /**
   *
   * @param {string} sectorId
   * @return {SwapInfo}
   */
  getSwapInfo(sectorId) {
    return new SwapInfo()
      .setUniverse(this.universe.getSwapInfo())
      .setSector(this.helperSector.getSwapInfoById(this.sectors, sectorId))
  }

  /**
   *
   *
   * @param {Function} eachMinuteCallback
   * @return {PlayGroundTimer}
   */
  addEventEachMinute(eachMinuteCallback) {
    this.spaceTimer.eachMinute(eachMinuteCallback)
    return this
  }

  /**
   *
   * @param eachMinuteCallback
   * @return {PlayGroundTimer}
   */
  removeEventEachMinute(eachMinuteCallback) {
    this.spaceTimer.removeCallbackMinute(eachMinuteCallback)
    return this
  }
}

export default PlayGroundTimer
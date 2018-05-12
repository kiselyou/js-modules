import Server from './Server'
import SpaceTimer from '../../helper/SpaceTimer'
import SwapInfo from '../../helper/SwapInfo'
import PlayGroundUniverse from './../repository/PlayGroundUniverse'
import PlayGroundSector from './../repository/PlayGroundSector'
import HelperSector from './../../entity/sector/helper/HelperSector'
import Player from './../../entity/sector/Player'

import { Clock } from 'three'


class PlayGroundProcess extends Server {
  /**
   *
   * @param {express} app
   */
  constructor(app) {
    super(app)

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
     * @type {PlayGroundUniverse}
     */
    this.universe = new PlayGroundUniverse()

    /**
     *
     * @type {PlayGroundSector}
     */
    this.sector = new PlayGroundSector()

    /**
     *
     * @type {HelperSector}
     */
    this.helperSector = new HelperSector()
  }

  async listen() {
    /**
     *
     * @type {Array<Sector>}
     */
    const sectors = await this.sector.getSectorsInfo()

    /**
     * @type Universe
     */
    const universe = await this.universe.getUniverse()

    // Расчет движения планет в секторах
    setInterval(() => {
      let delta = this.clock.getDelta();
      this.sector.update(delta, sectors)
    }, 1000 / 60)

    // Расчет игрового времени, добавление событий
    this.spaceTimer
      .setTimestamp(universe.timestamp)
      .eachMinute((eventData) => {
        this.universe.updateTimestamp(eventData.timestamp)
        this.sector.updateSectorsInfo(sectors)
      })
      .startTimer()

    // Сокет соеденение с игроком
    this.connect('play-process', (socket) => {

      const playerInfo = new Player()

      // Получение основной информации о текущем игроке
      socket.on('swap-player', (player) => {
        playerInfo.copy(player)
        playerInfo.setSocketId(socket.id)
        socket.emit('swap-player', playerInfo.getSwapInfo())
      })

      // Подготовка параметров для обмена данными об игровом процессе
      const eachMinuteEmit = () => {
        if (playerInfo.sectorId) {
          const swapInfo = new SwapInfo()
            .setUniverse(universe.getSwapInfo())
            .setSector(this.helperSector.getSwapInfoById(sectors, playerInfo.sectorId))
          socket.emit('each-minute', swapInfo)
        }
      }

      // Отправлять каждую минуту актуальную информацию об игровом процессе
      this.spaceTimer.eachMinute(eachMinuteEmit)

      socket.on('disconnect', () => {
        this.spaceTimer.removeCallbackMinute(eachMinuteEmit)
      });
    });
  }
}

export default PlayGroundProcess
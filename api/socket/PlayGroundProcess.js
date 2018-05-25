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

    this.connect('play-process', (socket) => {

      // WARNING
      // A Текущий игрок - твой браузер
      // B Удаленный игрок - игрок или игроки в других браузерах
      const playerInfo = new Player()

      // Получение основной информации о текущем игроке A
      socket.on('swap-current-player', (character) => {
        playerInfo.copy(character)
        playerInfo.setSocketId(socket.id)
        const data = playerInfo.getSwapInfo()
        // отправить инвормацию текущему игроку A измененные данные
        socket.emit('swap-current-player', data)
        // добавление текущего игрока A в секторе удаленных игроков B
        // TODO: нужно как то фильтровать по сектор ID
        socket.broadcast.emit('swap-add-player', data)
      })

      // перенаправить данные конкретному игроку
      socket.on('swap-add-specific-player', (data) => {
        // TODO: нужно как то фильтровать по сектор ID
        socket.broadcast.to(data.destinationSocketId).emit('swap-add-specific-player', data.character);
      });

      // перенаправить данные удаленным игрокам B в секторе крое текущего игрока A
      socket.on('swap-player-action-move', (data) => {
        // TODO: нужно как то фильтровать по сектор ID
        socket.broadcast.emit('swap-player-action-move', data);
      });


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
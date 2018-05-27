import Server from './Server'
import Player from './../../entity/sector/Player'
import PlayGroundTimer from './PlayGroundTimer'

class PlayGroundProcess extends Server {
  /**
   *
   * @param {express} app
   */
  constructor(app) {
    super(app)

    /**
     *
     * @type {PlayGroundTimer}
     */
    this.playGroundTimer = new PlayGroundTimer()
  }

  listen() {

    this.playGroundTimer.onLiveStart(() => {

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


        const eachMinuteEmit = () => {
          if (playerInfo.sectorId) {
            const swapInfo = this.playGroundTimer.getSwapInfo(playerInfo.sectorId)
            // Отправлять каждую минуту актуальную информацию об игровом процессе текущему игроку
            socket.emit('each-minute', swapInfo)
          }
        }

        this.playGroundTimer.addEventEachMinute(eachMinuteEmit)

        socket.on('disconnect', () => {
          this.playGroundTimer.removeEventEachMinute(eachMinuteEmit)
        });
      });

    })
  }
}

export default PlayGroundProcess
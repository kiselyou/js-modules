import Server from './Server'
import Player from './../../entity/particles-sector/Player'
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

        socket.on('swap-player-action-shot', (characterId, action, options) => {
          // TODO: нужно как то фильтровать по сектор ID
          socket.broadcast.emit('swap-player-action-shot', characterId, action, options);
        });

        socket.on('disconnect', () => {
          const data = playerInfo.getSwapInfo()
          // удалить текущего игрока A в секторе у игроков B
          socket.broadcast.emit('remove-player', data);
        });
      });

    })
  }
}

export default PlayGroundProcess
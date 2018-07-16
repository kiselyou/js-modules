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

          socket.join(data.sectorId);

          // отправить инвормацию текущему игроку A измененные данные
          socket.emit('swap-current-player', data)
          // добавление текущего игрока A в секторе удаленных игроков B
          socket.in(data.sectorId).broadcast.emit('swap-add-player', data)
        })

        // перенаправить данные конкретному игроку
        socket.in(playerInfo.sectorId).on('swap-add-specific-player', (data) => {
          socket.in(playerInfo.sectorId).broadcast.to(data.destinationSocketId).emit('swap-add-specific-player', data.character);
        });

        // перенаправить данные удаленным игрокам B в секторе крое текущего игрока A
        socket.in(playerInfo.sectorId).on('swap-player-action-move', (data) => {
          socket.in(playerInfo.sectorId).broadcast.emit('swap-player-action-move', data);
        });

        socket.in(playerInfo.sectorId).on('swap-player-action-shot', (characterId, action, options) => {
          socket.in(playerInfo.sectorId).broadcast.emit('swap-player-action-shot', characterId, action, options);
        });

        socket.on('disconnect', () => {
          const data = playerInfo.getSwapInfo()
          // удалить текущего игрока A в секторе у игроков B
          socket.in(playerInfo.sectorId).broadcast.emit('remove-player', data);
        });
      });
    })
  }
}

export default PlayGroundProcess
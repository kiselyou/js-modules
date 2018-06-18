import Playground from '@app/playground/Playground'
import ParticlePlayGround from '@entity/ParticlePlayGround'

import Ajax from '@helper/ajax/Ajax'
import Loader from '@app/playground/Loader'
import SwapInfo from '@helper/SwapInfo'
import io from 'socket.io-client'

/**
 *
 * @param {AppConfig} appConfig
 * @returns {Promise<void>}
 */
export default async function startPlay(appConfig) {
  const playGroundJson = await Ajax.post('/playground/data', { id: appConfig.user.id })
  const particlePlayGround = new ParticlePlayGround().jsonToObject(playGroundJson)

  const loader = new Loader()
  await loader.startLoad()

  let playground = new Playground(loader, particlePlayGround)

  await playground
    .registrationEvents()
    .init('root-canvas')

  const socket = io.connect(appConfig.socketPlayProcessUrl);

  // WARNING
  // A Текущий игрок - твой браузер
  // B Удаленный игрок - игрок или игроки в других браузерах

  // Отправить информацию на сервер о текущем игроке A
  socket.emit('swap-current-player', playground.character.player.getSwapInfo())
  // Обновить информацию о текущем игроке A
  socket.on('swap-current-player', (swapPlayer) => {
    playground.character.player.copy(swapPlayer)
  })

  // Добавление удаленного игрока B в сектор
  socket.on('swap-add-player', (swapPlayer) => {
    if (swapPlayer.sectorId === playground.sectorControls.sector.id) {
      playground.addPlayer(swapPlayer)
      // отправить информацию о текущем игроке A у удаленного игрока B
      socket.emit('swap-add-specific-player', {
        destinationSocketId: swapPlayer.socketId,
        character: playground.character.player.getSwapInfo()
      })
    }
  })

  // Добавление удаленного игрока B на карту текущего игрока A
  socket.on('swap-add-specific-player', (swapPlayer) => {
    if (swapPlayer.sectorId === playground.sectorControls.sector.id) {
      playground.addPlayer(swapPlayer)
    }
  })

  // Слежение за действиями текущего игрока A
  playground.character.moveControls.addMoveEventListener((moveSwapInfo) => {
    // Отправить удаленным игрокам B информацию действиях текущего игрока A
    socket.emit('swap-player-action-move', {
      moveSwapInfo: moveSwapInfo,
      characterId: playground.character.player.id
    })
  })

  // Изменяем состояние текущего игрока A у удаленных игроков B
  socket.on('swap-player-action-move', (data) => {
    //console.log(data.characterId)
    const playerControls = playground.findPlayerControls(data.characterId)
    if (playerControls) {
      playerControls.moveControls.setMoveSwapInfo(data.moveSwapInfo)
    } else {
      throw new Error('Error PlayerControls: can not find player by id ' + data.characterId)
    }
  });

  // Отправляем информацию о выстрелах (от игрока A удаленным игрокам B)
  playground.character.shotControls.addShotEventListener((action, modelChargeSwapInfo) => {
    socket.emit('swap-player-action-shot', playground.character.player.id, action, modelChargeSwapInfo)
  })

  // Слушаем изменения о выстрелах (игроки B получают информацию от A)
  socket.on('swap-player-action-shot', (characterId, action, data) => {
    const playerControls = playground.findPlayerControls(characterId)
    if (playerControls) {
      playerControls.shotControls.setShotSwapInfo(action, data)
    } else {
      throw new Error('Error PlayerControls: can not find player by id ' + characterId)
    }
  });

  socket.on('each-minute', (swapInfo) => {
    playground.setSwapInfo(
      new SwapInfo()
        .copy(swapInfo)
    )
  })
}
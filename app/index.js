import './style.css'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.jsx'
import Playground from '@app/playground/Playground'
import Loader from '@app/playground/Loader'
import Ajax from '@helper/ajax/Ajax'
import SwapInfo from '@helper/SwapInfo'
import io from 'socket.io-client'

import Player from '@entity/sector/Player'

// знаем только id игрока
const player = new Player().setId('09839694-28d3-4504-9dc9-1cd3b6a539d7')

ReactDOM.render(<App />, document.getElementById('root'));

(async () => {

  const appConfigJson = await Ajax.post('/app/config')
  const appConfig = JSON.parse(appConfigJson)
  const playGroundInfoJson = await Ajax.post('/user/data/1', player)
  const playGroundInfo = JSON.parse(playGroundInfoJson)

  console.log(playGroundInfo)

  const loader = new Loader()
  await loader.startLoad()

  if (playGroundInfo) {
    let playground = new Playground(loader)

    await playground
      .setAppConfig(appConfig)
      .registrationEvents()
      .copy(playGroundInfo)
      .init('root', 'root-canvas')

    const socket = io.connect(appConfig.socketPlayProcess);

    // WARNING
    // A Текущий игрок - твой браузер
    // B Удаленный игрок - игрок или игроки в других браузерах

    // Отправить информацию на сервер о текущем игроке A
    socket.emit('swap-current-player', playground.character.getSwapInfo())
    // Обновить информацию о текущем игроке A
    socket.on('swap-current-player', (swapPlayer) => {
      playground.character.copy(swapPlayer)
    })

    // Добавление удаленного игрока B в сектор
    socket.on('swap-add-player', (swapPlayer) => {
      if (swapPlayer.sectorId === playground.sectorControls.id) {
        playground.addPlayer(swapPlayer)
        // отправить информацию о текущем игроке A у удаленного игрока B
        socket.emit('swap-add-specific-player', {
          destinationSocketId: swapPlayer.socketId,
          character: playground.character.getSwapInfo()
        })
      }
    })

    // Добавление удаленного игрока B на карту текущего игрока A
    socket.on('swap-add-specific-player', (swapPlayer) => {
      if (swapPlayer.sectorId === playground.sectorControls.id) {
        playground.addPlayer(swapPlayer)
      }
    })

    // Слежение за действиями текущего игрока A
    playground.characterControls.addMoveEventListener((moveSwapInfo) => {
      // Отправить удаленным игрокам B информацию действиях текущего игрока A
      socket.emit('swap-player-action-move', {
        moveSwapInfo: moveSwapInfo,
        characterId: playground.character.id
      })
    })

    // Изменяем состояние текущего игрока A у удаленных игроков B
    socket.on('swap-player-action-move', (data) => {
      const playerControls = playground.findPlayerControls(data.characterId)
      if (playerControls) {
        playerControls.setMoveSwapInfo(data.moveSwapInfo)
      } else {
        throw new Error('Error PlayerControls: can not find player by id ' + data.characterId)
      }
    });

    socket.on('each-minute', (swapInfo) => {
      playground.setSwapInfo(
        new SwapInfo()
          .copy(swapInfo)
      )
    })

  } else {
    new Error('Cannot get users info')
  }

})()




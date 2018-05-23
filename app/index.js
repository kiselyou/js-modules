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

    socket.emit('swap-player', playground.player.getSwapInfo())
    socket.on('swap-player', (swapPlayer) => {
      playground.player.copy(swapPlayer)
    })

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




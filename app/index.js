import './style.css'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.jsx'
import Playground from '@app/playground/Playground'
import Loader from '@app/playground/Loader'
import Ajax from '@module/ajax/Ajax'
import io from 'socket.io-client'

ReactDOM.render(<App />, document.getElementById('root'));

(async () => {

  const playerInfoJson = await Ajax.post('http://localhost:3000/user/data/1')
  const playerInfo = JSON.parse(playerInfoJson)

  const loader = new Loader()
  await loader.startLoad()

  if (playerInfo) {
    let playground = new Playground({
      userInfo: playerInfo,
      loader: loader
    })
    playground.init('root', 'root-canvas')
  } else {
    new Error('Cannot get users info')
  }

  try {
    const socket = io.connect('http://127.0.0.1:3333/play-process');
    socket.on('timestamp', (data) => {
      console.log(data)
    })
  } catch (e) {
    console.warn(e)
  }


})()




import './style.css'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.jsx'
import Playground from '@app/playground/Playground'
import Ajax from '@module/ajax/Ajax'

ReactDOM.render(<App />, document.getElementById('root'));

(async () => {

  const playerInfoJson = await Ajax.post('http://localhost:3000/user/data/1')
  const playerInfo = JSON.parse(playerInfoJson)

  if (playerInfo) {
    let playground = new Playground()
    playground.playerControls.copy(playerInfo)
    playground.init('root', 'root-canvas')
  } else {
    new Error('Cannot get users info')
  }



})()




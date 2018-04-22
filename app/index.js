import './style.css'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App.jsx'
import Playground from '@app/playground/Playground'

ReactDOM.render(<App />, document.getElementById('root'));

let playground = new Playground()
playground.init('root', 'root-canvas')
playground.userInfo()



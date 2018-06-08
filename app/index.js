import './less/index.less'
import './../vendor/components-font-awesome/less/fa-solid.less'
import './../vendor/components-font-awesome/less/fontawesome.less'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './react/store/index'
import App from '@app/react/components/App'
import AppConfig from '@entity/AppConfig'
import Ajax from '@helper/ajax/Ajax'
import startPlay from './start-play'

(async () => {

  const appConfigJson = await Ajax.post('/app/config')
  const appConfig = new AppConfig().fromJSON(appConfigJson)
  const store = configureStore(appConfig)

  ReactDOM.render(
    <Provider store={store}>
      <App onPlay={async (user) => {
        // console.log(appConfig, user)
        await startPlay(appConfig)

        console.log(12312111)

      }}/>
    </Provider>,
    document.getElementById('root')
  );

})()




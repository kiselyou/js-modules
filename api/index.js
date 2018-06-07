import path from 'path'
import multer from 'multer'
import express from 'express'
import expressSession from 'express-session'
import redisStore from 'connect-redis'

import bodyParser from 'body-parser'
import routes from './routes'
import * as core from './core'
import PlayGroundProcess from './socket/PlayGroundProcess'
import { apiConfig, appConfig } from './config/config'

appConfig['apiBaseUrl'] = `http://${apiConfig.server.host}:${apiConfig.server.port}`
appConfig['socketPlayProcess'] = `http://${apiConfig.socket.host}:${apiConfig.socket.port}/play-process`

const app = express()

let RedisStore = redisStore(expressSession);
let session = expressSession({
  // store: new RedisStore({}),
  secret: '8ae49100-ec0c-4a2f-9e4c-e7b39dae61c5',
  resave: true,
  saveUninitialized: true
});

app.use(session);

// Add headers
app.use((req, res, next) => {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', apiConfig['accessControl'])

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true)

  // Pass to next layer of middleware
  next()
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))
app.use('/app/web', express.static('public/' + appConfig['version']))

app.get('/', (req, res) => {
  res.sendFile('/../../public/index.html')
})

app.post('/app/config', (req, res) => {
  appConfig['isUser'] = Boolean(core.getUserSession(req))
  res.json(appConfig)
})

for (const route of routes) {
  const method = route.method.toLowerCase()
  if (method === 'post') {
    app[method](route.path, multer().array(), (req, res) => {
      route.action(req, res, core)
    })
  } else {
    app[method](route.path, (req, res) => {
      route.action(req, res, core)
    })
  }
}

app.listen(apiConfig.server.port, apiConfig.server.host, () => {
  console.log(`Started host: ${apiConfig.server.host}, port: ${apiConfig.server.port}`)
})

const playProcess = new PlayGroundProcess(app)
playProcess.listen()

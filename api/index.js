import path from 'path'
import multer from 'multer'
import express from 'express'
import expressSession from 'express-session'
import redisStore from 'connect-redis'

import { defaultHeaders } from './middleware/headers'

import bodyParser from 'body-parser'
import routes from './routes'
import * as core from './core'
import PlayGroundProcess from './socket/PlayGroundProcess'

const app = express()

let RedisStore = redisStore(expressSession);
let session = expressSession({
  store: new RedisStore({}),
  secret: '8ae49100-ec0c-4a2f-9e4c-e7b39dae61c5',
  resave: false,
  saveUninitialized: false
});

app.use(session);

// Add headers
app.use(defaultHeaders)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static('public'))
app.use('/app/web', express.static('public/' + core.appConfig['version']))

app.get('/', (req, res) => {
  res.sendFile('/../../public/index.html')
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

app.listen(core.apiConfig.server.port, core.apiConfig.server.host, () => {
  console.log(`Started host: ${core.apiConfig.server.host}, port: ${core.apiConfig.server.port}`)
})

const playProcess = new PlayGroundProcess(app)
playProcess.listen()

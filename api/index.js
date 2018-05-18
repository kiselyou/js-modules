import path from 'path'
import multer from 'multer';
import express from 'express'
import bodyParser from 'body-parser'
import routes from './routes'
import { config } from './config/develop'
import * as core from './core'
import PlayGroundProcess from './socket/PlayGroundProcess'

const app = express()

// Add headers
app.use((req, res, next) => {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', config.allowIP)

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
app.use('/app/web', express.static('public/' + process.env.npm_package_version))

app.get('/', function(req, res) {
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

app.listen(config.server.port, config.server.host, () => {
  console.log(`Example app listening host ${config.server.host} on port ${config.server.port}`)
})

const playProcess = new PlayGroundProcess(app)
playProcess.listen()

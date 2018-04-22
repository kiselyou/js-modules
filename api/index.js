import path from 'path'
import express from 'express'
import * as routing from './config/routing'
import { config } from './config/develop'
import { mgDB } from './db/mongo'

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

app.use(express.static('public'))
app.use('/public', express.static(path.join(__dirname + '/../public')))

app.get('/', function(req, res) {
  res.sendFile('/../../public/index.html')
})

app.get('/user/data/:id', (req, res) => {
  routing['userData'](req, res)
})

app.listen(config.server.port, config.server.host, () => {
  console.log(`Example app listening host ${config.server.host} on port ${config.server.port}`)
})

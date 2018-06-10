import fs from 'fs'
import path from 'path'
import yml from 'js-yaml'
import AppConfig from './../../entity/AppConfig'

const api = yml.safeLoad(fs.readFileSync(path.join(__dirname, './api.config.yml'), 'utf8'))
const app = yml.safeLoad(fs.readFileSync(path.join(__dirname, './app.config.yml'), 'utf8'))

export const appConfig = new AppConfig()
  .addDefaultModelIds('842d5a80-6880-4047-b10b-a69850cf577b')
  .addDefaultModelIds('c4148d8b-d1f0-4a51-96c8-7fa28c767813')
  .addDefaultModelIds('4cfb2c5e-475d-4113-ad7e-929e84d41b60')
  .copy(app);

export const apiConfig = api;
import fs from 'fs'
import path from 'path'
import yml from 'js-yaml'
import AppConfig from './../../entity/AppConfig'

const api = yml.safeLoad(fs.readFileSync(path.join(__dirname, './api.config.yml'), 'utf8'))
const app = yml.safeLoad(fs.readFileSync(path.join(__dirname, './app.config.yml'), 'utf8'))

export const appConfig = new AppConfig().copy(app);
export const apiConfig = api;
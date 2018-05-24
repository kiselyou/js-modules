import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

export const apiConfig = yaml.safeLoad(fs.readFileSync(path.join(__dirname, './api.config.yml'), 'utf8'));
export const appConfig = yaml.safeLoad(fs.readFileSync(path.join(__dirname, './app.config.yml'), 'utf8'));
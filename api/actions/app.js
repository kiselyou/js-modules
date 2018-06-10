import * as core from './../core'
import Spaceship from './../../entity/particles-spaceship/Spaceship'

(async () => {
  const where = { entity: 'Spaceship', id: { $in: core.appConfig.defaultModelIds } }
  const db = await core.mgDBAsync()
  const collection = db.collection('Catalog')
  const models = await collection.find(where).toArray()
  core.appConfig.setDefaultModels(models)
})()

/**
 *
 * @param {object} req
 * @param {object} res
 */
export async function configuration(req, res) {

  core.appConfig
    .setApiBaseUrl(`http://${core.apiConfig.server.host}:${core.apiConfig.server.port}`)
    .setSocketPlayProcessUrl(`http://${core.apiConfig.socket.host}:${core.apiConfig.socket.port}/play-process`)
    .setUser(core.getUserSession(req))

  core.responseJSON(res, core.appConfig)
}

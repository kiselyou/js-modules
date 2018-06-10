import Player from './../../entity/particles-sector/Player'
import { insertPlayer } from './../repository/RepositoryPlayer'

export const players = [
  // new Player()
  //   .setPosition(300, 0, 300)
  //   .setName('Валера')
  //   .setId('09839694-28d3-4504-9dc9-1cd3b6a539d7')
  //   .setRaceId('2389afd5-5635-4b81-8a2c-13aec5955240')
  //   .setSectorId('f8a54ce6-d80d-4a36-b285-f12351b0a8ba')
  //   .setSpaceshipId('842d5a80-6880-4047-b10b-a69850cf577b'),
]

/**
 *
 * @param {Db} db
 * @param {Catalog} catalog
 * @returns {Promise<void>}
 */
export const installPlayer = async function (db, catalog) {
  for (const entity of players) {
    await insertPlayer(db, entity, catalog)
  }
}
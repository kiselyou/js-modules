import Sector from './sector/Sector'
import Planet from './sector/Planet'

export const init = {
  map: [
    new Sector()
      .setName('Alpha')
      .setSize(10000, 10000)
      .setPosition(0, 0)
      .addParticle(
        (sector) => {
          new Planet()
            .setName('Земля')
            .setSize(100)
            .setPopulation(10000000)
            .setPosition(200, 200)
            .setSectorId(sector.id)
        }
      )
      .addParticle(
        (sector) => {
          new Planet()
            .setName('Марс')
            .setSize(150)
            .setPosition(600, 600)
            .setPopulation(0)
            .setSectorId(sector.id)
        }
      ),
    new Sector()
      .setName('Betta')
      .setSize(10000, 10000)
      .setPosition(0, 10000)
  ]
}
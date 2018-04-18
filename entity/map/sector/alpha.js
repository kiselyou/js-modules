import Sector from '../../sector/Sector'
import Planet from '../../sector/Planet'
import Player from '../../sector/Player'
import Race from '../../sector/Race'
import Status from '../../sector/Status'
import MonitorStatus from '../../sector/relationship/MonitorStatus'

export const sector = new Sector()
  .setName('Alpha')
  .setSize(10000, 10000)
  .setPosition(0, 0)

export const race = {
  people: new Race().setName('Люди'),
}

export const player = new Player()
  .setName('Валера')
  .setPosition(1200, 1200)
  .setSectorId(sector.id)
  .setRaceId(race.people.id)

export const planets = {
  earth: new Planet()
    .setName('Земля')
    .setSize(100)
    .setPopulation(10000000)
    .setPosition(200, 200)
    .setSectorId(sector.id)
    .setRaceId(race.people.id),

  mars: new Planet()
    .setName('Марс')
    .setSize(150)
    .setPosition(600, 600)
    .setPopulation(50000)
    .setSectorId(sector.id)
    .setRaceId(race.people.id)
}

export const monitorStatus = [
  new MonitorStatus().setStatus(planets.mars.monitor.id, player.monitor.id, Status.NEUTRAL),
  new MonitorStatus().setStatus(planets.earth.monitor.id, player.monitor.id, Status.GOOD),
  new MonitorStatus().setStatus(race.people.monitor.id, player.monitor.id, Status.GOOD),
]
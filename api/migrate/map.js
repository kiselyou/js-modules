import Sector from './../../entity/sector/Sector'
import Planet from './../../entity/sector/Planet'
import Race from './../../entity/sector/Race'
import Player from './../../entity/sector/Player'
import Station from './../../entity/station/Station'
import Factory from './../../entity/station/Factory'
import Equipment from './../../entity/station/Equipment'
import Mineral from './../../entity/station/Mineral'
import Status from "./../../entity/sector/Status";

export const map = [
  [
    new Race()
      .setName('Люди')
  ],

  [
    new Mineral()
      .setName('Руда')
      .setWeight(1),
    new Mineral()
      .setName('Кристалл')
      .setWeight(1),
  ],

  [
    new Equipment()
      .setName('Солнечная батарея')
      .setDescription('Описание солнечная батарея.')
      .setWeight(2),
  ],

  [
    new Factory()
      .setName('Производство солнечных батарей'),
  ],

  [
    new Station()
      .setName('Научная станция'),
    new Station()
      .setName('Промышленная станция'),
  ],

  [
    new Sector()
      .setName('Alpha')
      .setSize(10000, 10000)
      .setPosition(0, 0),
  ],

  [
    new Planet()
      .setName('Земля')
      .setSize(100)
      .setPopulation(10000000),
    new Planet()
      .setName('Марс')
      .setSize(150)
      .setPopulation(50000),
  ],

  [
    new Player()
      .setName('Валера')
      .setPosition(1200, 1200)
  ],

  [
    new Status()
      .setName('Не известно')
      .setValue(Status.UNKNOWN),
    new Status()
      .setName('Превосходно')
      .setValue(Status.EXCELLENT),
    new Status()
      .setName('Хорошо')
      .setValue(Status.GOOD),
    new Status()
      .setName('Нейтральный')
      .setValue(Status.NEUTRAL),
    new Status()
      .setName('Враждебный')
      .setValue(Status.RANCOROUS),
    new Status()
      .setName('Война')
      .setValue(Status.WAR),
  ]
]
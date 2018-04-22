import Sector from './../../entity/sector/Sector'
import Planet from './../../entity/sector/Planet'
import Race from './../../entity/sector/Race'
import Player from './../../entity/sector/Player'
import Station from './../../entity/station/Station'
import Factory from './../../entity/station/Factory'
import Equipment from './../../entity/station/Equipment'
import Mineral from './../../entity/station/Mineral'
import Status from './../../entity/sector/Status'
import * as CONST from './../../app/constants'

export const map = [
  [
    new Race()
      .setName('Люди')
      .setId('2389afd5-5635-4b81-8a2c-13aec5955240')
  ],

  [
    new Mineral()
      .setName('Руда')
      .setWeight(1)
      .setId('4685f71d-c042-4252-a2a9-79ad558096ad'),
    new Mineral()
      .setName('Кристалл')
      .setWeight(1)
      .setId('5b22b60b-4f37-4a15-af28-ab95656334f9'),
  ],

  [
    new Equipment()
      .setName('Солнечная батарея')
      .setDescription('Описание солнечная батарея.')
      .setWeight(2)
      .setId('30c921cc-27c8-4909-a894-2db2ebb01152'),
  ],

  [
    new Factory()
      .setName('Производство солнечных батарей')
      .setId('b61b48f0-0b42-49b8-a1a7-8265e05f28da'),
  ],

  [
    new Station()
      .setName('Научная станция')
      .setId('47295f7e-2645-450a-8036-1445ee500a6b'),
    new Station()
      .setName('Промышленная станция')
      .setId('8cfa0370-d177-45cb-adfa-bac1d0581d0a'),
  ],

  [
    new Sector()
      .setName('Alpha')
      .setSize(1000, 1000, 1000)
      .setPosition(0, 0, 0)
      .setId('f8a54ce6-d80d-4a36-b285-f12351b0a8ba'),
  ],

  [
    new Planet()
      .setName('Земля')
      .setPosition(10, 0, 10)
      .setPopulation(7444443881)
      .setParams({ radius: 6.371 })
      .setTextures({
        map: CONST.KEY_PLANET_EARTH_MAP
      })
      .setId('d3c7c591-0fe9-4c76-9ffd-63741131060d')
      .setRaceId('2389afd5-5635-4b81-8a2c-13aec5955240')
      .setSectorId('f8a54ce6-d80d-4a36-b285-f12351b0a8ba'),
    new Planet()
      .setName('Луна')
      .setPosition(18, 0, -4)
      .setParams({ radius: 1.737 })
      .setId('ccc3fe37-1b8c-489c-bbbb-0b3e04783a71')
      .setParentId('d3c7c591-0fe9-4c76-9ffd-63741131060d')
      .setRaceId('2389afd5-5635-4b81-8a2c-13aec5955240')
      .setSectorId('f8a54ce6-d80d-4a36-b285-f12351b0a8ba'),
    new Planet()
      .setName('Марс')
      .setPosition(-18, 0, -8)
      .setParams({ radius: 3.39 })
      .setPopulation(5000)
      .setId('ccc3fe37-1b8c-489c-bbbb-0b3e04784d72')
      .setRaceId('2389afd5-5635-4b81-8a2c-13aec5955240')
      .setSectorId('f8a54ce6-d80d-4a36-b285-f12351b0a8ba'),
  ],

  [
    new Player()
      .setName('Валера')
      .setPosition(1200, 1200)
      .setId('09839694-28d3-4504-9dc9-1cd3b6a539d7')
      .setRaceId('2389afd5-5635-4b81-8a2c-13aec5955240')
      .setSectorId('f8a54ce6-d80d-4a36-b285-f12351b0a8ba')
  ],

  [
    new Status()
      .setName('Не известно')
      .setValue(Status.UNKNOWN)
      .setId('1432c69b-7e6a-4255-9d25-147ef22c0504'),
    new Status()
      .setName('Превосходно')
      .setValue(Status.EXCELLENT)
      .setId('8767bb57-d797-4855-8c3b-954c3a0b3302'),
    new Status()
      .setName('Хорошо')
      .setValue(Status.GOOD)
      .setId('1be8988e-5da3-44c8-8b73-e23b065288fb'),
    new Status()
      .setName('Нейтральный')
      .setValue(Status.NEUTRAL)
      .setId('02dfde0f-a585-41eb-90f0-336267150ec9'),
    new Status()
      .setName('Враждебный')
      .setValue(Status.RANCOROUS)
      .setId('6daeb972-75f2-46d7-a34d-a8306bb3ce7f'),
    new Status()
      .setName('Война')
      .setValue(Status.WAR)
      .setId('3669cd3e-4cc7-42fc-a018-9eed7a5f41f0'),
  ]
]
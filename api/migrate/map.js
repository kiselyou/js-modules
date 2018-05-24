import Sector from './../../entity/sector/Sector'
import Planet from './../../entity/sector/Planet'
import Asteroid from './../../entity/sector/Asteroid'
import Race from './../../entity/sector/Race'
import Player from './../../entity/sector/Player'
import Station from './../../entity/station/Station'
import Factory from './../../entity/station/Factory'
import Equipment from './../../entity/station/Equipment'
import Mineral from './../../entity/station/Mineral'
import Status from './../../entity/sector/Status'

import { mapStar } from './mapStar'
import { mapStarLights } from './mapStarLights'
import * as CONST from './../../app/constants'

const starKeySectorAlpha = 1

const ID_SECTOR_SUN = 'f8a54ce6-d80d-4a36-b285-f12351b0a8ba'
const ID_MINERAL_ORE = '4685f71d-c042-4252-a2a9-79ad558096ad'
const ID_MINERAL_CRYSTAL = '5b22b60b-4f37-4a15-af28-ab95656334f9'
const ID_MINERAL_WATER = '9907acc8-96be-43a4-92b8-f7be0ed07f92'

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
      .setId(ID_MINERAL_ORE),
    new Mineral()
      .setName('Кристалл')
      .setWeight(1)
      .setId(ID_MINERAL_CRYSTAL),
    new Mineral()
      .setName('Вода')
      .setWeight(1)
      .setId(ID_MINERAL_WATER),
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
      .setName('Солнечная станция')
      .setDistanceToCenter(180)
      .setAngleToCenter(Math.PI)
      .setId('7b857a0d-b128-42cf-9471-d1053a100a2c')
      .setSectorId(ID_SECTOR_SUN),
    new Station()
      .setName('Солнечная станция')
      .setDistanceToCenter(180)
      .setAngleToCenter(Math.PI / 5)
      .setId('0a1c3e2f-89ec-45c9-8fa7-f073713e68be')
      .setSectorId(ID_SECTOR_SUN),
    new Station()
      .setName('Солнечная станция')
      .setDistanceToCenter(180)
      .setAngleToCenter(Math.PI / 9)
      .setId('91141e8e-9d9d-4867-b01b-a00d279186f1')
      .setSectorId(ID_SECTOR_SUN),
    new Station()
      .setName('Научная станция')
      .setDistanceToCenter(500)
      .setAngleToCenter(Math.PI / 5)
      .setId('47295f7e-2645-450a-8036-1445ee500a6b')
      .setSectorId(ID_SECTOR_SUN),
    new Station()
      .setName('Промышленная станция')
      .setDistanceToCenter(500)
      .setAngleToCenter(Math.PI / 2)
      .setId('8cfa0370-d177-45cb-adfa-bac1d0581d0a')
      .setSectorId(ID_SECTOR_SUN),
  ],

  [
    new Sector()
      .setStarKey(starKeySectorAlpha)
      .setName('Alpha')
      .setSize(1000, 1000, 1000)
      .setPosition(0, 0, 0)
      .setId(ID_SECTOR_SUN),
  ],

  [
    new Planet()
      .setName('Земля')
      .setSpeedMove(0.0002)
      .setDistanceToCenter(400)
      .setPopulation(7444443881)
      .setParams({ radius: 6.371, segments: 40 })
      .setTextures({
        specular: 0x4D5A62,
        map: CONST.KEY_PLANET_EARTH_MAP,
        bump: {
          key: CONST.KEY_PLANET_EARTH_BUMP,
          scale: 0.4
        },
        spec: CONST.KEY_PLANET_EARTH_SPEC,
        cloudMap: CONST.KEY_PLANET_EARTH_CLOUD_MAP,
        cloudMapTrans: CONST.KEY_PLANET_EARTH_CLOUD_MAP_TRANS,
      })
      .setGlowInside({color: 0xA0D1E6, coefficient: 1.2, power: 1.9, length: 0.06})
      .setGlowOutside({color: 0xA0D1E6, coefficient: 0.01, power: 1.6, length: 0.6})
      .setId('d3c7c591-0fe9-4c76-9ffd-63741131060d')
      .setRaceId('2389afd5-5635-4b81-8a2c-13aec5955240')
      .setSectorId(ID_SECTOR_SUN),
    new Planet()
      .setName('Луна')
      .setSpeedMove(0.002)
      .setDistanceToCenter(50)
      .setParams({ radius: 1.737, segments: 40 })
      .setTextures({
        specular: 0x000000,
        map: CONST.KEY_PLANET_MOON_MAP,
        bump: {
          key: CONST.KEY_PLANET_MOON_BUMP,
          scale: 0.05
        },
      })
      .setGlowInside({color: 0xCCCCCC, coefficient: 1, power: 2.0, length: 0.1})
      .setGlowOutside({color: 0xFFFFFF, coefficient: 0.2, power: 2.5, length: 0.5})
      .setId('ccc3fe37-1b8c-489c-bbbb-0b3e04783a71')
      .setParentId('d3c7c591-0fe9-4c76-9ffd-63741131060d')
      .setRaceId('2389afd5-5635-4b81-8a2c-13aec5955240')
      .setSectorId(ID_SECTOR_SUN),
    new Planet()
      .setName('Марс')
      .setSpeedMove(0.0004)
      .setDistanceToCenter(1000)
      .setParams({ radius: 3.39, segments: 40 })
      .setPopulation(5000)
      .setTextures({
        specular: 0x000000,
        map: CONST.KEY_PLANET_MARS_MAP,
        bump: {
          key: CONST.KEY_PLANET_MARS_BUMP,
          scale: 0.03
        },
      })
      .setGlowInside({color: 0x625731, coefficient: 1, power: 2.0, length: 0.02})
      .setGlowOutside({color: 0x625731, coefficient: 0.1, power: 2.5, length: 0.5})
      .setId('ccc3fe37-1b8c-489c-bbbb-0b3e04784d72')
      .setRaceId('2389afd5-5635-4b81-8a2c-13aec5955240')
      .setSectorId(ID_SECTOR_SUN),
  ],

  [
    new Asteroid()
      .setName('AR-1')
      .addMineral(ID_MINERAL_ORE, 60000)
      .addMineral(ID_MINERAL_CRYSTAL, 2000)
      .setDistanceToCenter(800)
      .setAngleToCenter(Math.PI / 9)
      .setSectorId(ID_SECTOR_SUN)
      .setId('78969982-e002-412e-be23-279b4c020668'),
    new Asteroid()
      .setName('AR-2')
      .addMineral(ID_MINERAL_ORE, 4000)
      .addMineral(ID_MINERAL_WATER, 12000)
      .setDistanceToCenter(800)
      .setAngleToCenter(Math.PI / 7)
      .setSectorId(ID_SECTOR_SUN)
      .setId('3df7592b-56be-4d6c-abc5-c856c774d676'),
    new Asteroid()
      .setName('AR-3')
      .addMineral(ID_MINERAL_CRYSTAL, 18000)
      .addMineral(ID_MINERAL_ORE, 10000)
      .addMineral(ID_MINERAL_WATER, 2000)
      .setDistanceToCenter(800)
      .setAngleToCenter(Math.PI / -5)
      .setSectorId(ID_SECTOR_SUN)
      .setId('bbec590e-90cc-4195-8540-a7ab6a2d3ba4'),
    new Asteroid()
      .setName('AR-4')
      .addMineral(ID_MINERAL_CRYSTAL, 28000)
      .setSectorId(ID_SECTOR_SUN)
      .setDistanceToCenter(800)
      .setAngleToCenter(Math.PI / 3)
      .setId('de8a8c60-59cf-4bcb-8b76-1e11e99eb0c1'),
    new Asteroid()
      .setName('AR-5')
      .addMineral(ID_MINERAL_WATER, 38000)
      .setSectorId(ID_SECTOR_SUN)
      .setDistanceToCenter(800)
      .setAngleToCenter(Math.PI / -2)
      .setId('5be25f0c-aeab-4a2a-b308-113ae2721258'),
    new Asteroid()
      .setName('AR-6')
      .addMineral(ID_MINERAL_ORE, 24000)
      .setSectorId(ID_SECTOR_SUN)
      .setDistanceToCenter(800)
      .setAngleToCenter(Math.PI / -3)
      .setId('0c0ce86d-7d47-42fc-adba-b14f4de8464d')
  ],

  [
    new Player()
      .setName('Валера')
      .setId('09839694-28d3-4504-9dc9-1cd3b6a539d7')
      .setRaceId('2389afd5-5635-4b81-8a2c-13aec5955240')
      .setSectorId(ID_SECTOR_SUN)
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
  ],

  // mapStarLights(starKeySectorAlpha),
  // mapStar(starKeySectorAlpha)
]
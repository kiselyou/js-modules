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
import StarLight from './../../entity/sector/StarLight'

import Slot from './../../entity/model/Slot'
import Gun from './../../entity/model/particles/Gun'
import Spaceship from './../../entity/model/Spaceship'
import Engine from './../../entity/model/particles/Engine'

import * as CONST from './../../app/constants'

const KEY_STAR_SECTOR_ALPHA = 1
const ID_SECTOR_SUN = 'f8a54ce6-d80d-4a36-b285-f12351b0a8ba'
const ID_MINERAL_ORE = '4685f71d-c042-4252-a2a9-79ad558096ad'
const ID_MINERAL_CRYSTAL = '5b22b60b-4f37-4a15-af28-ab95656334f9'
const ID_MINERAL_WATER = '9907acc8-96be-43a4-92b8-f7be0ed07f92'
const ID_RACE_PEOPLE = '2389afd5-5635-4b81-8a2c-13aec5955240'

export const sectorSun = [
  [
    new Engine()
      .setId('a546531f-a38e-43db-8604-06b3b36d7291')
      .setName('Двигатель M50')
  ],
  [
    new Gun()
      .setId('4443c766-ccd8-4bff-b12d-8353bc024617')
      .setName('Импульсная пушка')
  ],
  [
    new Spaceship()
      .setModelKey(CONST.KEY_SPACESHIP_1)
      .addSlot(
        new Slot()
          .setType(Slot.TYPE_ENGINE)
      )
      .addSlot(
        new Slot()
          .setType(Slot.TYPE_GUN)
      )
      .addSlot(
        new Slot()
          .setType(Slot.TYPE_GUN)
      )
      .addSlot(
        new Slot()
          .setType(Slot.TYPE_GUN_TURRET)
      )
      .setId('842d5a80-6880-4047-b10b-a69850cf577b'),
    new Spaceship()
      .setModelKey(CONST.KEY_SPACESHIP_2)
      .addSlot(
        new Slot()
          .setType(Slot.TYPE_ENGINE)
      )
      .addSlot(
        new Slot()
          .setType(Slot.TYPE_GUN)
      )
      .addSlot(
        new Slot()
          .setType(Slot.TYPE_GUN)
      )
      .addSlot(
        new Slot()
          .setType(Slot.TYPE_GUN_TURRET)
      )
      .setId('c4148d8b-d1f0-4a51-96c8-7fa28c767813'),
    new Spaceship()
      .setModelKey(CONST.KEY_SPACESHIP_3)
      .addSlot(
        new Slot()
          .setType(Slot.TYPE_ENGINE)
      )
      .addSlot(
        new Slot()
          .setType(Slot.TYPE_GUN)
      )
      .addSlot(
        new Slot()
          .setType(Slot.TYPE_GUN)
      )
      .addSlot(
        new Slot()
          .setType(Slot.TYPE_GUN_TURRET)
      )
      .setId('4cfb2c5e-475d-4113-ad7e-929e84d41b60')
  ],
  [
    new Race()
      .setName('Люди')
      .setId(ID_RACE_PEOPLE)
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
      .setStarKey(KEY_STAR_SECTOR_ALPHA)
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
      })
      .setGlowInside({color: 0xA0D1E6, coefficient: 1.2, power: 1.9, length: 0.06})
      .setGlowOutside({color: 0xA0D1E6, coefficient: 0.01, power: 1.6, length: 0.6})
      .setId('d3c7c591-0fe9-4c76-9ffd-63741131060d')
      .setRaceId(ID_RACE_PEOPLE)
      .setSectorId(ID_SECTOR_SUN),
    new Planet()
      .setName('Луна')
      .setSpeedMove(0.002)
      .setDistanceToCenter(50)
      .setParams({ radius: 1.737, segments: 40 })
      .setTextures({
        specular: 0x000000,
        map: CONST.KEY_PLANET_MOON_MAP
      })
      .setGlowInside({color: 0xCCCCCC, coefficient: 1, power: 2.0, length: 0.1})
      .setGlowOutside({color: 0xFFFFFF, coefficient: 0.2, power: 2.5, length: 0.5})
      .setId('ccc3fe37-1b8c-489c-bbbb-0b3e04783a71')
      .setParentId('d3c7c591-0fe9-4c76-9ffd-63741131060d')
      .setRaceId(ID_RACE_PEOPLE)
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
      })
      .setGlowInside({color: 0x625731, coefficient: 1, power: 2.0, length: 0.02})
      .setGlowOutside({color: 0x625731, coefficient: 0.1, power: 2.5, length: 0.5})
      .setId('ccc3fe37-1b8c-489c-bbbb-0b3e04784d72')
      .setRaceId(ID_RACE_PEOPLE)
      .setSectorId(ID_SECTOR_SUN),
    new Planet()
      .setName('Ceres')
      .setSpeedMove(0.0004)
      .setDistanceToCenter(1200)
      .setParams({ radius: 3.39, segments: 40 })
      .setPopulation(5000)
      .setTextures({
        specular: 0x000000,
        map: CONST.KEY_PLANET_CERES_MAP,
      })
      .setGlowInside({color: 0x625731, coefficient: 1, power: 2.0, length: 0.02})
      .setGlowOutside({color: 0x625731, coefficient: 0.1, power: 2.5, length: 0.5})
      .setId('47e4fe7c-3d17-4e39-8d11-e22a0f2c3b58')
      .setRaceId(ID_RACE_PEOPLE)
      .setSectorId(ID_SECTOR_SUN),
    new Planet()
      .setName('Eris')
      .setSpeedMove(0.0004)
      .setDistanceToCenter(1350)
      .setParams({ radius: 3.39, segments: 40 })
      .setPopulation(5000)
      .setTextures({
        specular: 0x000000,
        map: CONST.KEY_PLANET_ERIS_MAP,
      })
      .setGlowInside({color: 0x625731, coefficient: 1, power: 2.0, length: 0.02})
      .setGlowOutside({color: 0x625731, coefficient: 0.1, power: 2.5, length: 0.5})
      .setId('c09575e9-b6c8-4944-8f69-43e5e89e6e12')
      .setRaceId(ID_RACE_PEOPLE)
      .setSectorId(ID_SECTOR_SUN),
    new Planet()
      .setName('Haumea')
      .setSpeedMove(0.0004)
      .setDistanceToCenter(1650)
      .setParams({ radius: 3.39, segments: 40 })
      .setPopulation(5000)
      .setTextures({
        specular: 0x000000,
        map: CONST.KEY_PLANET_HAUMEA_MAP,
      })
      .setGlowInside({color: 0x625731, coefficient: 1, power: 2.0, length: 0.02})
      .setGlowOutside({color: 0x625731, coefficient: 0.1, power: 2.5, length: 0.5})
      .setId('5ef86d7b-cd7b-4fae-93c4-f44cd6a95f14')
      .setRaceId(ID_RACE_PEOPLE)
      .setSectorId(ID_SECTOR_SUN),
    new Planet()
      .setName('Jupiter')
      .setSpeedMove(0.0004)
      .setDistanceToCenter(1850)
      .setParams({ radius: 3.39, segments: 40 })
      .setPopulation(5000)
      .setTextures({
        specular: 0x000000,
        map: CONST.KEY_PLANET_JUPITER_MAP,
      })
      .setGlowInside({color: 0x625731, coefficient: 1, power: 2.0, length: 0.02})
      .setGlowOutside({color: 0x625731, coefficient: 0.1, power: 2.5, length: 0.5})
      .setId('daa15781-cca1-437c-b3f4-f160cd8ab210')
      .setRaceId(ID_RACE_PEOPLE)
      .setSectorId(ID_SECTOR_SUN),
    new Planet()
      .setName('Makemake')
      .setSpeedMove(0.0004)
      .setDistanceToCenter(2050)
      .setParams({ radius: 3.39, segments: 40 })
      .setPopulation(5000)
      .setTextures({
        specular: 0x000000,
        map: CONST.KEY_PLANET_MAKEMAKE_MAP,
      })
      .setGlowInside({color: 0x625731, coefficient: 1, power: 2.0, length: 0.02})
      .setGlowOutside({color: 0x625731, coefficient: 0.1, power: 2.5, length: 0.5})
      .setId('9e66d7f0-2ab5-4fec-ae48-dc8e5a2290ea')
      .setRaceId(ID_RACE_PEOPLE)
      .setSectorId(ID_SECTOR_SUN),
    new Planet()
      .setName('Mercury')
      .setSpeedMove(0.0004)
      .setDistanceToCenter(2050)
      .setParams({ radius: 3.39, segments: 40 })
      .setPopulation(5000)
      .setTextures({
        specular: 0x000000,
        map: CONST.KEY_PLANET_MERCURY_MAP,
      })
      .setGlowInside({color: 0x625731, coefficient: 1, power: 2.0, length: 0.02})
      .setGlowOutside({color: 0x625731, coefficient: 0.1, power: 2.5, length: 0.5})
      .setId('31f311b6-4c0f-4fc9-9a2b-5e30c34f4f8a')
      .setRaceId(ID_RACE_PEOPLE)
      .setSectorId(ID_SECTOR_SUN),
    new Planet()
      .setName('Neptun')
      .setSpeedMove(0.0004)
      .setDistanceToCenter(2250)
      .setParams({ radius: 3.39, segments: 40 })
      .setPopulation(5000)
      .setTextures({
        specular: 0x000000,
        map: CONST.KEY_PLANET_NEPTUN_MAP,
      })
      .setGlowInside({color: 0x625731, coefficient: 1, power: 2.0, length: 0.02})
      .setGlowOutside({color: 0x625731, coefficient: 0.1, power: 2.5, length: 0.5})
      .setId('96cdf3ca-4914-469c-a9fc-69b8949995a8')
      .setRaceId(ID_RACE_PEOPLE)
      .setSectorId(ID_SECTOR_SUN),
    new Planet()
      .setName('Saturn')
      .setSpeedMove(0.0004)
      .setDistanceToCenter(2450)
      .setParams({ radius: 3.39, segments: 40 })
      .setPopulation(5000)
      .setTextures({
        specular: 0x000000,
        map: CONST.KEY_PLANET_SATURN_MAP,
      })
      .setGlowInside({color: 0x625731, coefficient: 1, power: 2.0, length: 0.02})
      .setGlowOutside({color: 0x625731, coefficient: 0.1, power: 2.5, length: 0.5})
      .setId('8b8bd117-5d1c-481a-874f-3f02c9a942cc')
      .setRaceId(ID_RACE_PEOPLE)
      .setSectorId(ID_SECTOR_SUN),
    new Planet()
      .setName('Sun')
      .setSpeedMove(0.0004)
      .setDistanceToCenter(2650)
      .setParams({ radius: 3.39, segments: 40 })
      .setPopulation(5000)
      .setTextures({
        specular: 0x000000,
        map: CONST.KEY_PLANET_SUN_MAP,
      })
      .setGlowInside({color: 0x625731, coefficient: 1, power: 2.0, length: 0.02})
      .setGlowOutside({color: 0x625731, coefficient: 0.1, power: 2.5, length: 0.5})
      .setId('8beee4b1-73af-4909-9515-3062adf3fce6')
      .setRaceId(ID_RACE_PEOPLE)
      .setSectorId(ID_SECTOR_SUN),
    new Planet()
      .setName('Uranus')
      .setSpeedMove(0.0004)
      .setDistanceToCenter(2850)
      .setParams({ radius: 3.39, segments: 40 })
      .setPopulation(5000)
      .setTextures({
        specular: 0x000000,
        map: CONST.KEY_PLANET_URANUS_MAP,
      })
      .setGlowInside({color: 0x625731, coefficient: 1, power: 2.0, length: 0.02})
      .setGlowOutside({color: 0x625731, coefficient: 0.1, power: 2.5, length: 0.5})
      .setId('45dd6bf4-3f22-4852-816a-4d0fcfadd61b')
      .setRaceId(ID_RACE_PEOPLE)
      .setSectorId(ID_SECTOR_SUN),
    new Planet()
      .setName('Venus')
      .setSpeedMove(0.0004)
      .setDistanceToCenter(3050)
      .setParams({ radius: 3.39, segments: 40 })
      .setPopulation(5000)
      .setTextures({
        specular: 0x000000,
        map: CONST.KEY_PLANET_VENUS_MAP,
      })
      .setGlowInside({color: 0x625731, coefficient: 1, power: 2.0, length: 0.02})
      .setGlowOutside({color: 0x625731, coefficient: 0.1, power: 2.5, length: 0.5})
      .setId('be2ec1ca-e957-4dc5-af39-0125d8909fbb')
      .setRaceId(ID_RACE_PEOPLE)
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
      .setRaceId(ID_RACE_PEOPLE)
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

  [
    new StarLight()
      .setKey(KEY_STAR_SECTOR_ALPHA)
      .setId('3879859e-d2cb-473d-b14c-e39078e0d2eb')
      .setTextureKey(CONST.KEY_LIGHT_CONTROLS_1)
      .setPosition(0, -1550, -1200),
    new StarLight()
      .setKey(KEY_STAR_SECTOR_ALPHA)
      .setId('43105511-e59a-44b1-b435-bc8acb95a517')
      .setTextureKey(CONST.KEY_LIGHT_CONTROLS_11)
      .setPosition(2400, 0, -2200),
    new StarLight()
      .setKey(KEY_STAR_SECTOR_ALPHA)
      .setId('4e39aae0-eea9-46a4-a55b-0c9001ce93e9')
      .setTextureKey(CONST.KEY_LIGHT_CONTROLS_14)
      .setRotationSpeed(0.003)
      .setPosition(-1250, -100, 100),
    new StarLight()
      .setKey(KEY_STAR_SECTOR_ALPHA)
      .setId('9a7dc8e2-4fc5-4dad-a0b7-8f6f3ae9857b')
      .setTextureKey(CONST.KEY_LIGHT_CONTROLS_14)
      .setRotationSpeed(-0.004)
      .setPosition(-1200, 100, -500),
    new StarLight()
      .setKey(KEY_STAR_SECTOR_ALPHA)
      .setId('4d30db52-a3fb-4755-b25b-c9dcdf534562')
      .setTextureKey(CONST.KEY_LIGHT_CONTROLS_5)
      .setPosition(1000, -580, -1600),
    new StarLight()
      .setKey(KEY_STAR_SECTOR_ALPHA)
      .setId('88895e42-03ac-48ed-a0b4-3dbd5c7e75fc')
      .setTextureKey(CONST.KEY_LIGHT_CONTROLS_6)
      .setPosition(2200, 300, 100),
    new StarLight()
      .setKey(KEY_STAR_SECTOR_ALPHA)
      .setId('5d633ccc-a8e6-4937-8c9e-6035c425cb56')
      .setTextureKey(CONST.KEY_LIGHT_CONTROLS_9)
      .setRotationSpeed(0.005)
      .setPosition(900, 100, 1600),
    new StarLight()
      .setKey(KEY_STAR_SECTOR_ALPHA)
      .setId('b83a4ac9-cf2c-426c-88b5-325d0c566011')
      .setTextureKey(CONST.KEY_LIGHT_CONTROLS_13)
      .setPosition(-2400, 600, -2400),
    new StarLight()
      .setKey(KEY_STAR_SECTOR_ALPHA)
      .setId('52fb2dd9-d247-4c90-b110-bedbc9f9b281')
      .setTextureKey(CONST.KEY_LIGHT_CONTROLS_14)
      .setRotationSpeed(-0.005)
      .setPosition(200, -600, -200),
    new StarLight()
      .setKey(KEY_STAR_SECTOR_ALPHA)
      .setId('61093ac1-f40c-41b0-9681-c9c9f2599c6e')
      .setTextureKey(CONST.KEY_LIGHT_CONTROLS_15)
      .setPosition(-2100, -1800, 1900)
  ]
  // mapStar(KEY_STAR_SECTOR_ALPHA)
]
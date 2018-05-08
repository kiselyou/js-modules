import StarLight from './../../entity/sector/StarLight'
import * as CONST from './../../app/constants'

export function mapStarLights(starKey) {
  return [
    new StarLight()
      .setKey(starKey)
      .setId('3879859e-d2cb-473d-b14c-e39078e0d2eb')
      .setFlareOptions({size: 20, textureKey: CONST.KEY_LIGHT_CONTROLS_11})
      .setPosition(0, -1550, -2000),
    new StarLight()
      .setKey(starKey)
      .setId('43105511-e59a-44b1-b435-bc8acb95a517')
      .setFlareOptions({size: 120, textureKey: CONST.KEY_LIGHT_CONTROLS_4})
      .setPosition(1000, 1000, 1000),
    new StarLight()
      .setKey(starKey)
      .setId('4e39aae0-eea9-46a4-a55b-0c9001ce93e9')
      .setFlareOptions({size: 50, textureKey: CONST.KEY_LIGHT_CONTROLS_5})
      .setPosition(-2000, -1000, 100),
    new StarLight()
      .setKey(starKey)
      .setId('9a7dc8e2-4fc5-4dad-a0b7-8f6f3ae9857b')
      .setFlareOptions({size: 30, textureKey: CONST.KEY_LIGHT_CONTROLS_6})
      .setPosition(-2000, 100, -2000),
    new StarLight()
      .setKey(starKey)
      .setId('4d30db52-a3fb-4755-b25b-c9dcdf534562')
      .setFlareOptions({size: 60, textureKey: CONST.KEY_LIGHT_CONTROLS_9})
      .setPosition(4000, 80, -1000),
    new StarLight()
      .setKey(starKey)
      .setId('88895e42-03ac-48ed-a0b4-3dbd5c7e75fc')
      .setFlareOptions({size: 100, textureKey: CONST.KEY_LIGHT_CONTROLS_14})
      .setPosition(2000, 2000, -2000),
    new StarLight()
      .setKey(starKey)
      .setId('5d633ccc-a8e6-4937-8c9e-6035c425cb56')
      .setFlareOptions({size: 80, textureKey: CONST.KEY_LIGHT_CONTROLS_14})
      .setPosition(1000, -2000, 0)
  ]
}
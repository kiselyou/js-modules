import { Vector3 } from 'three'
import * as CONST from './../../app/constants'
import Slot from './../../entity/particles-spaceship/Slot'
import Spaceship from './../../entity/particles-spaceship/Spaceship'

export const spaceship = [
  new Spaceship()
    .setModelKey(CONST.KEY_SPACESHIP_1)
    .addSlot(
      new Slot()
        .setParticleId('a546531f-a38e-43db-8604-06b3b36d7291')
        .setType(Slot.TYPE_ENGINE)
    )
    .addSlot(
      new Slot()
        .setParticleId('4443c766-ccd8-4bff-b12d-8353bc024617')
        .setType(Slot.TYPE_GUN)
    )
    .addSlot(
      new Slot()
        .setParticleId('4443c766-ccd8-4bff-b12d-8353bc024617')
        .setType(Slot.TYPE_GUN)
    )
    .addSlot(
      new Slot()
        .setType(Slot.TYPE_GUN_TURRET)
    )
    .setId('842d5a80-6880-4047-b10b-a69850cf577b')
    .setName('Spaceship - 1'),
  new Spaceship()
    .setModelKey(CONST.KEY_SPACESHIP_2)
    .addSlot(
      new Slot()
        .setParticleId('a1f8c408-b804-41ad-9659-8f04fe8c22cb')
        .setType(Slot.TYPE_ENGINE)
    )
    .addSlot(
      new Slot()
        .setParticleId('4443c766-ccd8-4bff-b12d-8353bc024617')
        .setPosition(new Vector3( - 5, 0, 0))
        .setType(Slot.TYPE_GUN)
    )
    .addSlot(
      new Slot()
        .setParticleId('4443c766-ccd8-4bff-b12d-8353bc024617')
        .setPosition(new Vector3(5, 0, 0))
        .setType(Slot.TYPE_GUN)
    )
    .addSlot(
      new Slot()
        .setType(Slot.TYPE_GUN_TURRET)
    )
    .setId('c4148d8b-d1f0-4a51-96c8-7fa28c767813')
    .setName('Spaceship - 2'),
  new Spaceship()
    .setModelKey(CONST.KEY_SPACESHIP_3)
    .addSlot(
      new Slot()
        .setParticleId('ef285367-cd53-490f-a32c-a235dd0f0132')
        .setType(Slot.TYPE_ENGINE)
    )
    .addSlot(
      new Slot()
        .setParticleId('4443c766-ccd8-4bff-b12d-8353bc024617')
        .setType(Slot.TYPE_GUN)
    )
    .addSlot(
      new Slot()
        .setParticleId('4443c766-ccd8-4bff-b12d-8353bc024617')
        .setType(Slot.TYPE_GUN)
    )
    .addSlot(
      new Slot()
        .setType(Slot.TYPE_GUN_TURRET)
    )
    .setId('4cfb2c5e-475d-4113-ad7e-929e84d41b60')
    .setName('Spaceship - 3')
]
import { Vector3 } from 'three'
import Slot from './../../entity/particles-spaceship/Slot'
import Spaceship from './../../entity/particles-spaceship/Spaceship'

export const spaceship = [
  new Spaceship()
    .addSlot(
      new Slot()
        .setParticleId('1c7a41c9-a7ea-4db5-9d40-4ca6a3f911e8')
        .setType(Slot.TYPE_SHELL)
    )
    .addSlot(
      new Slot()
        .setParticleId('36f8af38-0b5e-4785-8a8b-e7fd21228b38')
        .setType(Slot.TYPE_ARMOR)
    )
    .addSlot(
      new Slot()
        .setParticleId('6cfd3a13-d4c5-4977-9472-53286063616a')
        .setType(Slot.TYPE_ENERGY)
    )
    .addSlot(
      new Slot()
        .setParticleId('a546531f-a38e-43db-8604-06b3b36d7291')
        .setType(Slot.TYPE_ENGINE)
    )
    .addSlot(
      new Slot()
        .setParticleId('4443c766-ccd8-4bff-b12d-8353bc024617')
        .setPosition(new Vector3(-1.8, 1, 0))
        .setType(Slot.TYPE_GUN)
    )
    .addSlot(
      new Slot()
        .setParticleId('4443c766-ccd8-4bff-b12d-8353bc024617')
        .setPosition(new Vector3(1.8, 1, 0))
        .setType(Slot.TYPE_GUN)
    )
    .addSlot(
      new Slot()
        .setParticleId('4443c766-ccd8-4bff-b12d-8353bc024617')
        .setPosition(new Vector3(0, 1, 1.8))
        .setType(Slot.TYPE_GUN)
    )
    .addSlot(
      new Slot()
        .setType(Slot.TYPE_GUN_TURRET)
    )
    .setId('842d5a80-6880-4047-b10b-a69850cf577b')
    .setName('Spaceship - 1'),
  new Spaceship()
    .addSlot(
      new Slot()
        .setParticleId('a8a05d5d-2e88-4f63-9fed-7ca91d6e8189')
        .setType(Slot.TYPE_SHELL)
    )
    .addSlot(
      new Slot()
        .setParticleId('7902d19c-cc04-4659-a365-cedaa64cac7f')
        .setType(Slot.TYPE_ARMOR)
    )
    .addSlot(
      new Slot()
        .setParticleId('b265df0c-0192-4c64-8f27-33409929b8b3')
        .setType(Slot.TYPE_ENERGY)
    )
    .addSlot(
      new Slot()
        .setParticleId('a1f8c408-b804-41ad-9659-8f04fe8c22cb')
        .setType(Slot.TYPE_ENGINE)
    )
    .addSlot(
      new Slot()
        .setParticleId('4443c766-ccd8-4bff-b12d-8353bc024617')
        .setPosition(new Vector3( - 1.8, 1, 0))
        .setType(Slot.TYPE_GUN)
    )
    .addSlot(
      new Slot()
        .setParticleId('4443c766-ccd8-4bff-b12d-8353bc024617')
        .setPosition(new Vector3(1.8, 1, 0))
        .setType(Slot.TYPE_GUN)
    )
    .addSlot(
      new Slot()
        .setType(Slot.TYPE_GUN_TURRET)
    )
    .setId('c4148d8b-d1f0-4a51-96c8-7fa28c767813')
    .setName('Spaceship - 2'),
  new Spaceship()
    .addSlot(
      new Slot()
        .setParticleId('ec4b84e3-3d76-4dc6-adbc-7f0c095d099c')
        .setType(Slot.TYPE_SHELL)
    )
    .addSlot(
      new Slot()
        .setParticleId('c2d4df8a-5dc3-4a51-b54d-fa352a2dbb6c')
        .setType(Slot.TYPE_ARMOR)
    )
    .addSlot(
      new Slot()
        .setParticleId('eeaf29c2-9d43-40ce-921a-f6765a528a68')
        .setType(Slot.TYPE_ENERGY)
    )
    .addSlot(
      new Slot()
        .setParticleId('ef285367-cd53-490f-a32c-a235dd0f0132')
        .setType(Slot.TYPE_ENGINE)
    )
    .addSlot(
      new Slot()
        .setParticleId('4443c766-ccd8-4bff-b12d-8353bc024617')
        .setPosition(new Vector3(-1.8, 1, 0))
        .setType(Slot.TYPE_GUN)
    )
    .addSlot(
      new Slot()
        .setParticleId('4443c766-ccd8-4bff-b12d-8353bc024617')
        .setPosition(new Vector3(1.8, 1, 0))
        .setType(Slot.TYPE_GUN)
    )
    .addSlot(
      new Slot()
        .setType(Slot.TYPE_GUN_TURRET)
    )
    .setId('4cfb2c5e-475d-4113-ad7e-929e84d41b60')
    .setName('Spaceship - 3')
]
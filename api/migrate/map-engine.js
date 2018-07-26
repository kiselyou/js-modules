import Engine from './../../entity/particles-spaceship/Engine'

export const engine = [
  new Engine()
    .setMaxSpeed(100)
    .setMaxReverseSpeed( - 50)
    .setAcceleration(100)
    .setDeceleration(100)
    .setAngularSpeed(2)
    .setId('a546531f-a38e-43db-8604-06b3b36d7291')
    .setName('Engine M20'),
  new Engine()
    .setMaxSpeed(110)
    .setMaxReverseSpeed( - 50)
    .setAcceleration(105)
    .setDeceleration(1005)
    .setAngularSpeed(2)
    .setId('a1f8c408-b804-41ad-9659-8f04fe8c22cb')
    .setName('Engine M50'),
  new Engine()
    .setMaxSpeed(120)
    .setMaxReverseSpeed( - 50)
    .setAcceleration(110)
    .setDeceleration(110)
    .setAngularSpeed(2)
    .setId('ef285367-cd53-490f-a32c-a235dd0f0132')
    .setName('Engine M90')
]
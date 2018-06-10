import Engine from './../../entity/particles-spaceship/Engine'

export const engine = [
  new Engine()
    .setMaxSpeed(40)
    .setMaxReverseSpeed( - 15)
    .setAcceleration(10)
    .setDeceleration(10)
    .setAngularSpeed(1)
    .setId('a546531f-a38e-43db-8604-06b3b36d7291')
    .setName('Engine M20'),
  new Engine()
    .setMaxSpeed(50)
    .setMaxReverseSpeed( - 10)
    .setAcceleration(10)
    .setDeceleration(10)
    .setAngularSpeed(1.2)
    .setId('a1f8c408-b804-41ad-9659-8f04fe8c22cb')
    .setName('Engine M50'),
  new Engine()
    .setMaxSpeed(60)
    .setMaxReverseSpeed( - 20)
    .setAcceleration(10)
    .setDeceleration(10)
    .setAngularSpeed(1.5)
    .setId('ef285367-cd53-490f-a32c-a235dd0f0132')
    .setName('Engine M90')
]
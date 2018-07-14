import Gun from './../../entity/particles-spaceship/Gun'

export const gun = [
  new Gun()
    .setEnergy(15)
    .setRechargeTime(1200)
    .setMaxDeflection(Math.PI / 7)
    .setChargeSpeed(600)
    .setDamageMin(24)
    .setDamageMax(40)
    .setMaxDistance(2000)
    .setId('4443c766-ccd8-4bff-b12d-8353bc024617')
    .setName('Импульсная пушка I'),
  new Gun()
    .setEnergy(25)
    .setRechargeTime(1000)
    .setMaxDeflection(Math.PI / 6)
    .setChargeSpeed(700)
    .setDamageMin(30)
    .setDamageMax(52)
    .setMaxDistance(2500)
    .setId('62dc9713-a63f-442b-988d-6f87ffa4da8e')
    .setName('Импульсная пушка II'),
  new Gun()
    .setEnergy(40)
    .setRechargeTime(800)
    .setMaxDeflection(Math.PI / 5)
    .setChargeSpeed(800)
    .setDamageMin(34)
    .setDamageMax(60)
    .setMaxDistance(2600)
    .setId('778f45f7-3820-423a-a75b-caaac3530a52')
    .setName('Импульсная пушка III')
]
import Status from './../../entity/particles-sector/Status'

export const status = [
  new Status()
    .setName('Не известно')
    .setValue(Status.UNKNOWN)
    .setId('1432c69b-7e6a-4255-9d25-147ef22c0504'),
  new Status()
    .setName('Война')
    .setValue(Status.WAR)
    .setId('3669cd3e-4cc7-42fc-a018-9eed7a5f41f0'),
  new Status()
    .setName('Враждебный')
    .setValue(Status.RANCOROUS)
    .setId('6daeb972-75f2-46d7-a34d-a8306bb3ce7f'),
  new Status()
    .setName('Нейтральный')
    .setValue(Status.NEUTRAL)
    .setId('02dfde0f-a585-41eb-90f0-336267150ec9'),
  new Status()
    .setName('Хорошо')
    .setValue(Status.GOOD)
    .setId('1be8988e-5da3-44c8-8b73-e23b065288fb'),
  new Status()
    .setName('Превосходно')
    .setValue(Status.EXCELLENT)
    .setId('8767bb57-d797-4855-8c3b-954c3a0b3302'),
]
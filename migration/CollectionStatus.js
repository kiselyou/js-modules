import Status from '../entity/sector/Status'

export const CollectionStatus = () => [
  new Status()
    .setName('Не известно')
    .setValue(Status.UNKNOWN),
  new Status()
    .setName('Превосходно')
    .setValue(Status.EXCELLENT),
  new Status()
    .setName('Хорошо')
    .setValue(Status.GOOD),
  new Status()
    .setName('Нейтральный')
    .setValue(Status.NEUTRAL),
  new Status()
    .setName('Враждебный')
    .setValue(Status.RANCOROUS),
  new Status()
    .setName('Война')
    .setValue(Status.WAR),
]

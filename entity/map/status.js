import Status from '../sector/Status'

export const status = {
  [Status.UNKNOWN]: new Status().setValue(Status.UNKNOWN).setName('Не известно'),
  [Status.EXCELLENT]: new Status().setValue(Status.EXCELLENT).setName('Превосходно'),
  [Status.GOOD]: new Status().setValue(Status.GOOD).setName('Хорошо'),
  [Status.NEUTRAL]: new Status().setValue(Status.NEUTRAL).setName('Нейтральный'),
  [Status.RANCOROUS]: new Status().setValue(Status.RANCOROUS).setName('Враждебный'),
  [Status.WAR]: new Status().setValue(Status.WAR).setName('Война'),
}

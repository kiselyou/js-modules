import Equipment from './../entity/station/Equipment'

export const CollectionEquipment = () => {
  return [
    new Equipment()
      .setName('Ионная батарея')
      .setDescription('Описание Ионная батарея.')
      .setWeight(2),
  ]
}
import Station from '../entity/station/Station'

export const CollectionStation = () => {
  return [
    new Station()
      .setName('Солнечные электростанция'),
  ]
}
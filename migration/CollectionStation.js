import Station from '../entity/station/Station'

export default CollectionStation = () => {
  return [
    new Station()
      .setName('Солнечные электростанция'),
  ]
}
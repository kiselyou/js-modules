import Mineral from '../entity/station/Mineral'

export default CollectionMineral = () => {
  return [
    new Mineral()
      .setName('Руда')
      .setWeight(2),
    new Mineral()
      .setName('Кристалл'),
  ]
}
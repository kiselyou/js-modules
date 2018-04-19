import Sector from '../entity/sector/Sector'

export const CollectionSector = () => {
  return [
    new Sector()
      .setName('Alpha')
      .setSize(10000, 10000)
      .setPosition(0, 0)
  ]
}







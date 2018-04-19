import Player from '../entity/sector/Player'

export const CollectionPlayer = () => {
  return [
    new Player()
      .setName('Валера')
      .setPosition(1200, 1200)
  ]
}
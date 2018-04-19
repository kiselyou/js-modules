import Planet from '../entity/sector/Planet'

export const CollectionPlanet = () => {
  return [
    new Planet()
      .setName('Земля')
      .setSize(100)
      .setPopulation(10000000),
    new Planet()
      .setName('Марс')
      .setSize(150)
      .setPopulation(50000)
  ]
}

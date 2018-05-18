import Playground from './Playground'

(async () => {

  let playground = new Playground()

  await playground
    .registrationEvents()
    .init('root', 'root-canvas')

})()
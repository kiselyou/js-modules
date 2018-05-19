import PlaygroundTest1 from './tests/PlaygroundTest1'

(async () => {

  let playground = new PlaygroundTest1()

  await playground
    .registrationEvents()
    .init('root', 'root-canvas')

})()
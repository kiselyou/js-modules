import TestScene from './tests/TestScene'

(async () => {

  let scene = new TestScene()

  await scene
    .registrationEvents()
    .init('root', 'root-canvas');

  scene.update()

})()
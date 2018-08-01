import DebugPanel from '@app/debug/DebugPanel'

class DebugCannonWorld {
  /**
   *
   * @param {Playground} playground
   */
  constructor(playground) {
    /**
     *
     * @type {Playground}
     */
    this.playground = playground

    /**
     *
     * @type {DebugPanel}
     */
    this.debug = new DebugPanel()
  }

  build() {

    console.log(this.playground.world)

    this.debug
      .addFolder('World')
      .add(this.playground.world.solver, 'iterations', 'Solver Iterations', 0, 100)
      .addFolder('Contact Equation')
      .add(this.playground.world.defaultContactMaterial, 'contactEquationRelaxation', 'Relaxation', 0, 20)
      .addFolder('Body')
      .add(this.playground.character.model.boxBody, 'mass', 'Mass', 0, 1000)
      .add(this.playground.character.model.boxBody, 'linearDamping', 'Linear Damping', 0, 1)
      .add(this.playground.character.model.boxBody, 'boundingRadius', 'Bounding Radius', 0, 1000)
      .addFolder('Body Velocity')
      .listenFields(true)
      .add(this.playground.character.model.boxBody.velocity, 'x', 'X')
      .add(this.playground.character.model.boxBody.velocity, 'y', 'Y')
      .add(this.playground.character.model.boxBody.velocity, 'z', 'Z')
      .listenFields(false)
      .addFolder('Body position')
      .listenFields(true)
      .add(this.playground.character.model.boxBody.position, 'x', 'X')
      .add(this.playground.character.model.boxBody.position, 'y', 'Y')
      .add(this.playground.character.model.boxBody.position, 'z', 'Z')
      .listenFields(false)
      .addEventOnChange((value, name) => {
        switch (name) {
          case 'mass':
          case 'linearDamping':
            this.playground.character.model.boxBody.updateMassProperties()
            break
        }
      })

    this.debug.open()
  }
}

export default DebugCannonWorld
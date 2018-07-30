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
    this.debug
      .addFolder('World')
      .add(this.playground.world.solver, 'iterations', 'Solver Iterations', 0, 100)
      .addFolder('Contact Equation')
      .add(this.playground.world.defaultContactMaterial, 'contactEquationStiffness', 'Stiffness', 1000, 10000000)
      .add(this.playground.world.defaultContactMaterial, 'contactEquationRelaxation', 'Relaxation', 0, 20)

    this.debug.open()
  }
}

export default DebugCannonWorld
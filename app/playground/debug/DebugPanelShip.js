import DebugPanel from '@app/debug/DebugPanel'

class DebugPanelShip {
  /**
   *
   * @param {CharacterControls} character
   */
  constructor(character) {
    /**
     *
     * @type {CharacterControls}
     */
    this.character = character

    /**
     *
     * @type {DebugPanel}
     */
    this.debug = new DebugPanel()
  }

  build() {
    const engine = this.character.spaceship.getEngine()

    this.debug
      .addFolder('Ship Info')
      .listenFields(true)
      .add(this.character, 'enabled', 'Controls enabled')
      .add(engine, 'speed', 'Ship Speed')
      .add(this.character.model.position, 'x', 'Ship X')
      .add(this.character.model.position, 'y', 'Ship Y')
      .add(this.character.model.position, 'z', 'Ship Z')
      .listenFields(false)
      .addFolder('Ship speed')
      .add(engine, 'maxSpeed', 'Max', 10, 400)
      .add(engine, 'maxReverseSpeed', 'Max Reverse', -200, 0)
      .add(engine, 'angularSpeed', 'Angular Speed', 0.01, 5)
      .add(engine, 'acceleration', 'Acceleration', 10, 500)
      .add(engine, 'deceleration', 'Deceleration', 10, 500)
      .open()
  }
}

export default DebugPanelShip
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
    const shell = this.character.spaceship.getShell()
    const gunEnergy = this.character.spaceship.getGunEnergy()
    const shipEnergy = this.character.spaceship.getShipEnergy()
    const groupEnergy = this.character.spaceship.getGroupEnergy()
    const guns = this.character.spaceship.getGuns()

    this.debug
      .addFolder('Character')
      .add(this.character, 'enabled', 'Controls enabled')
      .listenFields(true)
      .add(this.character.model.position, 'x', 'Ship X')
      .add(this.character.model.position, 'y', 'Ship Y')
      .add(this.character.model.position, 'z', 'Ship Z')
      .listenFields(false)

      .addFolder('Ship Engine')
      .listenFields(true)
      .add(engine, 'speed', 'Speed')
      .listenFields(false)
      .add(engine, 'maxSpeed', 'Max', 10, 400)
      .add(engine, 'maxReverseSpeed', 'Max Reverse', -200, 0)
      .add(engine, 'angularSpeed', 'Angular Speed', 0.01, 5)
      .add(engine, 'acceleration', 'Acceleration', 10, 500)
      .add(engine, 'deceleration', 'Deceleration', 10, 500)

      .addFolder('Ship Shell')
      .listenFields(true)
      .add(shell, 'restoreSize', 'Restore Size', 0, 100)
      .add(shell, 'restoreTime', 'Restore Time', 60, 10000)
      .add(shell, 'size', 'Size', 0, 10000)
      .add(shell, 'state', 'State %', 0, 100)
      .add(shell, 'stateSize', 'State size', 0, shell.size)
      .listenFields(false)

      .addFolder('Ship Generators')
      .listenFields(true)
      .add({count: groupEnergy.elements.length}, 'count', 'Count')
      .add(groupEnergy, 'gunEnergySize', 'Gun Energy %', 5, 95)
      .add(groupEnergy, 'shipEnergySize', 'Ship Energy %', 5, 95)
      .addEventOnChange((value, name) => {
        switch (name) {
          case 'gunEnergySize':
            groupEnergy.shipEnergySize = 100 - groupEnergy.gunEnergySize
            groupEnergy.updateEnergy()
            break
          case 'shipEnergySize':
            groupEnergy.gunEnergySize = 100 - groupEnergy.shipEnergySize
            groupEnergy.updateEnergy()
            break
        }
      })

      .listenFields(false)

    let i = 0
    for (const element of groupEnergy.elements) {
      i++
      this.debug
        .addFolder(`${i}. ${element.name}`)
        .add(element, 'restoreSize', `Restore Size`, 0, 100)
        .add(element, 'restoreTime', `Restore Time`, 60, 10000)
    }


    this.debug
      .addFolder('Ship Energy')
      .listenFields(true)
      .add(shipEnergy, 'size', 'Size', 0, 10000)
      .add(shipEnergy, 'state', 'State %', 0, 100)
      .add(shipEnergy, 'stateSize', 'State size', 0, shipEnergy.size)
      .listenFields(false)

      .addFolder('Gun Energy')
      .listenFields(true)
      .add(gunEnergy, 'size', 'Size', 0, 10000)
      .add(gunEnergy, 'state', 'State %', 0, 100)
      .add(gunEnergy, 'stateSize', 'State size', 0, gunEnergy.size)
      .listenFields(false)

    let a = 0
    for (const gun of guns) {
      a++
      this.debug
        .addFolder(`${a}. ${gun.name}`)
        .listenFields(true)
        .add(gun, 'energy', 'Spend energy', 2, 500)
        .add(gun, 'rechargeTime', 'Recharge Time', 60, 10000)
        .add(gun, 'maxDeflection', 'Max Deflection', - Math.PI, Math.PI)
        .add(gun.charge, 'speed', 'Charge Speed', 100, 10000)
        .add(gun.charge, 'damageMin', 'Damage min', 2, 1000)
        .add(gun.charge, 'damageMax', 'Damage max', 2, 1000)
        .add(gun.charge, 'maxDistance', 'Distance', 100, 10000)
        .listenFields(false)
        .addEventOnChange((value, name) => {
          switch (name) {
            case 'rechargeTime':
              gun.rechargeTimeState = value
              break
            case 'damageMin':
              if (value > gun.charge.damageMax) {
                gun.charge.damageMax = value + 2
              }
              break
            case 'damageMax':
              if (value < gun.charge.damageMin) {
                gun.charge.damageMin = value - 2
              }
              break
          }
        })
    }

    this.debug.open()
  }
}

export default DebugPanelShip
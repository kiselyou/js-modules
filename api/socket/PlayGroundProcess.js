import Server from './Server'
import SpaceTimer from './../../entity/SpaceTimer'
import PlayGroundUniverse from './../repository/PlayGroundUniverse'
import PlayGroundSector from './../repository/PlayGroundSector'
import { Clock } from 'three'


class PlayGroundProcess extends Server {
  /**
   *
   * @param {express} app
   */
  constructor(app) {
    super(app)

    /**
     *
     * @type {Clock}
     */
    this.clock = new Clock();

    /**
     *
     * @type {SpaceTimer}
     */
    this.spaceTimer = new SpaceTimer()

    /**
     *
     * @type {PlayGroundUniverse}
     */
    this.universe = new PlayGroundUniverse()

    /**
     *
     * @type {PlayGroundSector}
     */
    this.sector = new PlayGroundSector()
  }

  async listen() {
    const sectors = await this.sector.getSectorsInfo()
    const universe = await this.universe.getUniverse()


    // Расчет движения планет в секторах
    setInterval(() => {
      let delta = this.clock.getDelta();
      this.sector.update(delta, sectors)
    }, 1000 / 60)


    this.spaceTimer
      .setTimestamp(universe.timestamp)
      .eachMinute((eventData) => {
        this.universe.updateTimestamp(eventData.timestamp)
        this.sector.updateSectorsInfo(sectors)
      })
      .startTimer()

    this.connect('play-process', (socket) => {
      const eachMinuteEmit = (eventData) => {
        socket.emit('timestamp', {
          timestamp: eventData.timestamp,
          sector: sectors[0].children
        });
      }

      this.spaceTimer.eachMinute(eachMinuteEmit)

      socket.on('disconnect', () => {
        this.spaceTimer.removeCallbackMinute(eachMinuteEmit)
      });
    });
  }
}

export default PlayGroundProcess
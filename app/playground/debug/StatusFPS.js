import Stats from 'stats-js'

class StatusFPS {
  constructor() {
    /**
     *
     * @type {Stats}
     */
    this.stats = new Stats()
  }

  /**
   * @returns {void}
   */
  build() {
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.left = '0px';
    this.stats.domElement.style.top = '0px';
    document.body.appendChild(this.stats.domElement);
  }

  /**
   * @returns {void}
   */
  update() {
    this.stats.update()
  }
}

export default StatusFPS
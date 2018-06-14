import { Mesh } from 'three'

class Model extends Mesh {
  constructor() {
    super()

    /**
     *
     * @type {boolean}
     */
    this.enableIntersect = true
  }
}

export default Model
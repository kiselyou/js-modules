import { Vector3, Geometry, PointsMaterial, Points, Math } from 'three'

class StarControls {
  /**
   *
   * @param {Scene} scene
   */
  constructor(scene) {
    /**
     * @type {Scene}
     */
    this.scene = scene

    // /**
    //  *
    //  * @type {Geometry}
    //  */
    // this.starsGeometry = new Geometry()
    //
    // /**
    //  *
    //  * @type {PointsMaterial}
    //  */
    // this.starsMaterial = new PointsMaterial({color: 0x888888})

    /**
     *
     * @type {Points}
     */
    // this.starField = new Points(this.starsGeometry, this.starsMaterial)
  }

  /**
   *
   * @returns {void}
   */
  async beforeStart() {
    // this.starField.geometry.needsUpdate = true
    console.log(111)
    // this.scene.add(this.starField)
  }

  /**
   *
   * @param data
   */
  copy(data) {
    // const starsGeometry = new Geometry()
    //
    //
    // for (const item of data) {
    //   const p = new Vector3()
    //   p.copy(item['position'])
    //   starsGeometry.vertices.push(p)
    // }
    //
    // const starsMaterial = new PointsMaterial({color: 0x888888})
    // const starField = new Points(starsGeometry, starsMaterial)
    // this.scene.add(starField)

    var starsGeometry = new Geometry();

    for (const item of data) {
      // const p = new Vector3()
      // p.copy(item['position'])
      starsGeometry.vertices.push(item['position'])
    }

    // for ( var i = 0; i < 10000; i ++ ) {
    //
    //   var star = new Vector3();
    //   star.x = Math.randFloatSpread( 2000 );
    //   star.y = Math.randFloatSpread( 2000 );
    //   star.z = Math.randFloatSpread( 2000 );
    //
    //   starsGeometry.vertices.push( star );
    //
    // }

    var starsMaterial = new PointsMaterial( { color: 0x888888, size: 5 } );

    var starField = new Points( starsGeometry, starsMaterial );


    this.scene.add( starField );
  }
}

export default StarControls
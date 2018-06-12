import { Group, Vector3, Color, Shape, ShapeGeometry, MeshBasicMaterial, Mesh, DoubleSide } from 'three'

class Aim extends Group {
  constructor() {
    super()

    this.rotation.x = Math.PI / 2

    /**
     *
     * @type {number}
     */
    this.countArrows = 3;

    /**
     *
     * @type {number}
     */
    this.radius = 10;

    /**
     * This is width of arrow
     *
     * @type {number}
     */
    this.arrawWidth = 10

    /**
     * This is length of arrow
     *
     * @type {number}
     */
    this.arrawLength = 90

    /**
     *
     * @type {number}
     */
    this.color = 0x7FFF00;

    /**
     *
     * @type {Vector3}
     */
    this.center = new Vector3(0, 0, 0)

    /**
     *
     * @type {Vector3}
     */
    this.axis = new Vector3(1, 0, 0)
  }

  /**
   * Build aim
   *
   * @returns {Aim}
   */
  build() {
    let i = 0, x = 0, z = 0, angle = 0
    let half = Math.PI / 2
    let step = Math.PI * 2 / this.countArrows

    switch (this.countArrows) {
      case 3:
        this.rotation.y = -Math.PI / 6
        break
    }

    while (i < this.countArrows) {
      x = this.center.x + this.radius * Math.cos(angle)
      z = this.center.z + this.radius * Math.sin(angle)
      let mesh = this.arrowMesh()
      mesh.position.set(x, 0, z)
      mesh.lookAt(this.center)
      mesh.rotateOnAxis(this.axis, - half)
      this.add(mesh)
      angle += step
      i++
    }

    return this;
  }

  /**
   *
   * @returns {Mesh}
   * @private
   */
  arrowMesh() {
    let w = this.arrawWidth / 2;
    let l = this.arrawLength / 2;
    let tw = 10;
    let tl = 45;
    let x = 0, y = 0;

    let triangleShape = new Shape();
    triangleShape.moveTo(x, y);
    triangleShape.lineTo(x + w, y + l);
    triangleShape.lineTo(x + tw, y + l);
    triangleShape.lineTo(x + tw, y + tl);
    triangleShape.lineTo(x - tw, y + tl);
    triangleShape.lineTo(x - tw, y + l);
    triangleShape.lineTo(x - w, y + l);
    triangleShape.moveTo(x, y);

    let geometry = new ShapeGeometry(triangleShape);
    let material = new MeshBasicMaterial({ color: this.color, overdraw: 0.5, side: DoubleSide });
    return new Mesh(geometry, material);
  }

  /**
   *
   * @param {number} color
   * @returns {Aim}
   */
  setColor(color) {
    for (let model of this.children) {
      model.material.color = new Color(color);
      model.material.needsUpdate = true;
    }
    return this;
  }
}

export default Aim;
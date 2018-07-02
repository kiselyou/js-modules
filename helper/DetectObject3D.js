import { Box3, Vector3 } from 'three'

const box3 = new Box3()
const target = new Vector3()

class DetectObject3D {
  /**
   *
   * @param {Object3D|Model} element
   * @returns {Vector3}
   */
  static size(element) {
    let box = box3.setFromObject(element);
    return box.getSize(target);
  }

  /**
   *
   * @param {Object3D} element
   * @returns {number}
   */
  static maxSize(element) {
    const size = DetectObject3D.size(element)
    return Math.max(Math.max(size.x, size.y), size.z) / 2;
  }
}

export default DetectObject3D
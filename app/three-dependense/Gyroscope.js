import * as THREE from 'three'

/**
 * @author alteredq / http://alteredqualia.com/
 */

export default function Gyroscope() {

	THREE.Object3D.call( this );

};

Gyroscope.prototype = Object.create( THREE.Object3D.prototype );
Gyroscope.prototype.constructor = Gyroscope;

Gyroscope.prototype.updateMatrixWorld = ( function () {

	let translationObject = new THREE.Vector3();
  let quaternionObject = new THREE.Quaternion();
  let scaleObject = new THREE.Vector3();

  let translationWorld = new THREE.Vector3();
  let quaternionWorld = new THREE.Quaternion();
  let scaleWorld = new THREE.Vector3();

	return function updateMatrixWorld( force ) {

		this.matrixAutoUpdate && this.updateMatrix();

		// update matrixWorld

		if ( this.matrixWorldNeedsUpdate || force ) {

			if ( this.parent !== null ) {

				this.matrixWorld.multiplyMatrices( this.parent.matrixWorld, this.matrix );

				this.matrixWorld.decompose( translationWorld, quaternionWorld, scaleWorld );
				this.matrix.decompose( translationObject, quaternionObject, scaleObject );

				this.matrixWorld.compose( translationWorld, quaternionObject, scaleWorld );


			} else {

				this.matrixWorld.copy( this.matrix );

			}


			this.matrixWorldNeedsUpdate = false;

			force = true;

		}

		// update children

		for ( let i = 0, l = this.children.length; i < l; i ++ ) {

			this.children[ i ].updateMatrixWorld( force );

		}

	};

}() );

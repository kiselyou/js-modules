import { ShaderMaterial, Color, Face4, Face3, Object3D, Mesh, BackSide } from 'three'

export function glowShaderMaterial() {
  const vertexShader	= [
    'varying vec3	vVertexWorldPosition;',
    'varying vec3	vVertexNormal;',

    'varying vec4	vFragColor;',

    'void main(){',
    '	vVertexNormal	= normalize(normalMatrix * normal);',

    '	vVertexWorldPosition	= (modelMatrix * vec4(position, 1.0)).xyz;',

    '	// set gl_Position',
    '	gl_Position	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
    '}',

  ].join('\n')
  const fragmentShader	= [
    'uniform vec3	glowColor;',
    'uniform float	coeficient;',
    'uniform float	power;',

    'varying vec3	vVertexNormal;',
    'varying vec3	vVertexWorldPosition;',

    'varying vec4	vFragColor;',

    'void main(){',
    '	vec3 worldCameraToVertex= vVertexWorldPosition - cameraPosition;',
    '	vec3 viewCameraToVertex	= (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;',
    '	viewCameraToVertex	= normalize(viewCameraToVertex);',
    '	float intensity		= pow(coeficient + dot(vVertexNormal, viewCameraToVertex), power);',
    '	gl_FragColor		= vec4(glowColor, intensity);',
    '}',
  ].join('\n')

  return new ShaderMaterial({
    uniforms: {
      coeficient	: {
        type	: "f",
        value	: 1.0
      },
      power		: {
        type	: "f",
        value	: 2
      },
      glowColor	: {
        type	: "c",
        value	: new Color('pink')
      },
    },
    vertexShader	: vertexShader,
    fragmentShader	: fragmentShader,
    //blending	: THREE.AdditiveBlending,
    transparent	: true,
    depthWrite	: false,
  })
}

export function dilateGeometry(geometry, length) {
  const vertexNormals	= [geometry.vertices.length]

  geometry.faces.forEach((face) => {
    if ( face instanceof Face4 ) {
      vertexNormals[face.a]	= face.vertexNormals[0]
      vertexNormals[face.b]	= face.vertexNormals[1]
      vertexNormals[face.c]	= face.vertexNormals[2]
      vertexNormals[face.d]	= face.vertexNormals[3]
    } else if( face instanceof Face3 ) {
      vertexNormals[face.a]	= face.vertexNormals[0]
      vertexNormals[face.b]	= face.vertexNormals[1]
      vertexNormals[face.c]	= face.vertexNormals[2]
    } else {
      console.assert(false, 'dilateGeometry')
    }
  })

  geometry.vertices.forEach((vertex, idx) => {
    const vertexNormal = vertexNormals[idx]
    vertex.x	+= vertexNormal.x * length
    vertex.y	+= vertexNormal.y * length
    vertex.z	+= vertexNormal.z * length
  })
}

export function GeometricGlowMesh(mesh) {

  this.object3d = new Object3D

  const material = glowShaderMaterial()
  material.uniforms.glowColor.value	= new Color('cyan')
  material.uniforms.coeficient.value = 0.5
  material.uniforms.power.value	= 1.7

  const geometry = mesh.geometry.clone()
  dilateGeometry(geometry, 1.5)

  this.insideMesh = new Mesh(geometry, material)
  this.object3d.add(this.insideMesh)

  const material2 = glowShaderMaterial()
  material2.uniforms.glowColor.value = new Color('cyan')
  material2.uniforms.coeficient.value	= 0.46
  material2.uniforms.power.value = 5
  material2.side = BackSide

  const geometry2	= mesh.geometry.clone()
  dilateGeometry(geometry2, 1)

  this.outsideMesh = new Mesh(geometry2, material2)
  this.object3d.add(this.outsideMesh)
}

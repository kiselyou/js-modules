import { ShaderMaterial, Color, Face4, Face3, Object3D, Mesh, BackSide } from 'three'
import PlanetGlow from "@entity/PlanetGlow";

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
    'uniform float	coefficient;',
    'uniform float	power;',

    'varying vec3	vVertexNormal;',
    'varying vec3	vVertexWorldPosition;',

    'varying vec4	vFragColor;',

    'void main(){',
    '	vec3 worldCameraToVertex= vVertexWorldPosition - cameraPosition;',
    '	vec3 viewCameraToVertex	= (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;',
    '	viewCameraToVertex	= normalize(viewCameraToVertex);',
    '	float intensity		= pow(coefficient + dot(vVertexNormal, viewCameraToVertex), power);',
    '	gl_FragColor		= vec4(glowColor, intensity);',
    '}',
  ].join('\n')

  return new ShaderMaterial({
    uniforms: {
      coefficient	: {
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

/**
 *
 * @param {Mesh} mesh
 * @param {PlanetGlow} options
 * @returns {Mesh}
 * @constructor
 */
export function getGlowInsideMesh(mesh, options) {
  const material = glowShaderMaterial()
  material.uniforms.glowColor.value	= new Color(options.color)
  material.uniforms.coefficient.value = options.coefficient
  material.uniforms.power.value	= options.power

  const geometry = mesh.geometry.clone()
  dilateGeometry(geometry, options.length)

  return new Mesh(geometry, material)
}

/**
 *
 * @param {Mesh} mesh
 * @param {PlanetGlow} options
 * @returns {Mesh}
 * @constructor
 */
export function getGlowOutsideMesh(mesh, options) {
  const material = glowShaderMaterial()
  material.uniforms.glowColor.value = new Color(options.color)
  material.uniforms.coefficient.value = options.coefficient
  material.uniforms.power.value = options.power
  material.side = BackSide

  const geometry	= mesh.geometry.clone()
  dilateGeometry(geometry, options.length)

  return new Mesh(geometry, material)
}
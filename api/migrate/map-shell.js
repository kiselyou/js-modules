import Shell from './../../entity/particles-spaceship/Shell'
import * as CONST from './../../app/constants'

export const shell = [
  new Shell()
    .setModelKey(CONST.KEY_SPACESHIP_1)
    .setId('1c7a41c9-a7ea-4db5-9d40-4ca6a3f911e8')
    .setName('Shell 1'),
  new Shell()
    .setModelKey(CONST.KEY_SPACESHIP_2)
    .setId('a8a05d5d-2e88-4f63-9fed-7ca91d6e8189')
    .setName('Shell 2'),
  new Shell()
    .setModelKey(CONST.KEY_SPACESHIP_3)
    .setId('ec4b84e3-3d76-4dc6-adbc-7f0c095d099c')
    .setName('Shell 3')
]
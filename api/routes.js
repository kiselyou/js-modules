import { configuration } from './actions/app'
import { playerDataAdd } from './actions/player'
import { playGroundData } from './actions/playground'
import { userAuthorization, userRegistration, userRestore, logout } from './actions/auth'

const routes = [
  {
    method: 'post',
    path: '/app/config',
    action: configuration
  },
  {
    method: 'post',
    path: '/playground/data',
    action: playGroundData
  },
  {
    method: 'post',
    path: '/user/authorization',
    action: userAuthorization
  },
  {
    method: 'post',
    path: '/user/registration',
    action: userRegistration
  },
  {
    method: 'post',
    path: '/user/restore',
    action: userRestore
  },
  {
    method: 'get',
    path: '/user/logout',
    action: logout
  },
  {
    method: 'post',
    path: '/player/data/add',
    action: playerDataAdd
  },
]

export default routes
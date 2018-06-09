import { playGroundData } from './actions/playground'
import { userAuthorization, userRegistration, userRestore, logout } from './actions/auth'

const routes = [
  {
    method: 'post',
    path: '/user/data/:id',
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
  }
]

export default routes
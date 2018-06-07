import { playGroundData } from './actions/playground'
import { userAuthorization, userRegistration } from './actions/auth'

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
  }
]

export default routes
import { userData } from './actions/userData'

const routes = [
  {
    method: 'post',
    path: '/user/data/:id',
    action: userData
  }
]

export default routes
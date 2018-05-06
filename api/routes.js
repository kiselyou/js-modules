import { playGroundData } from './actions/playGroundData'

const routes = [
  {
    method: 'post',
    path: '/user/data/:id',
    action: playGroundData
  }
]

export default routes
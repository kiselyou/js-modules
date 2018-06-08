import { SET_USER } from '../actions/authAction'
import AppConfig from '@entity/AppConfig'

const initialState = new AppConfig()

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      state.user.copy(action.payload)
      break
  }
  return state
}
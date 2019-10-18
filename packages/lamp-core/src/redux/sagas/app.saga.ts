import { put } from 'redux-saga/effects'
import { ADD_TOOLBAR_BUTTON_GENERATOR } from '../types/app.type'

export function* fetchUser(action: any) {
  yield put({ type: ADD_TOOLBAR_BUTTON_GENERATOR, data: action.payload })
}

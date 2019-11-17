import { put } from 'redux-saga/effects'
import { ADD_TOOLBAR_BUTTON_GENERATOR, SWITCH_ACTIVE_TABBAR_KEY, SET_PROJECT_ROOT } from '../types/app.type'
import { ARTICLE_TYPE } from 'utils/constants'

export function* switchTabbar(action: { type: string; payload: ARTICLE_TYPE }) {
  yield put({ type: SWITCH_ACTIVE_TABBAR_KEY, payload: action.payload })
}

export function* fetchUser(action: any) {
  yield put({ type: ADD_TOOLBAR_BUTTON_GENERATOR, data: action.payload })
}

export function* setProjectRoot(action: any) {
  yield put({ type: SET_PROJECT_ROOT, payload: action.payload })
}

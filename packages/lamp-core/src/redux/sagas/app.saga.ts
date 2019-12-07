import { put } from 'redux-saga/effects'
import { SWITCH_ACTIVE_TABBAR_KEY, SET_PROJECT_ROOT, TOGGLE_SNACKBAR } from '../types/app.type'
import { ARTICLE_TYPE } from 'utils/constants'

export function* switchTabbar(action: { type: string; payload: ARTICLE_TYPE }) {
  yield put({ type: SWITCH_ACTIVE_TABBAR_KEY, payload: action.payload })
}

export function* setProjectRoot(action: any) {
  yield put({ type: SET_PROJECT_ROOT, payload: action.payload })
}

export function* toggleSnackbar(action: any) {
  yield put({ type: TOGGLE_SNACKBAR, payload: action.payload })
}

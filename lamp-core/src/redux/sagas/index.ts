import { takeLatest } from 'redux-saga/effects'
import { fetchUser } from './app.saga'

export default function* mySaga() {
  yield takeLatest('USER_FETCH_REQUESTED', fetchUser)
}

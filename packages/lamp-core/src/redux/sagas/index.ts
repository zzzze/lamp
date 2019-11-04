import { takeLatest } from 'redux-saga/effects'
import { fetchUser } from 'redux/sagas/app.saga'
import { fetchArticleData } from 'redux/sagas/hexo.saga'

export default function* mySaga() {
  yield takeLatest('USER_FETCH_REQUESTED', fetchUser)
  yield takeLatest('FETCH_REQUESTED', fetchArticleData)
}

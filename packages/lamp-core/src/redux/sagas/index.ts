import { takeLatest } from 'redux-saga/effects'
import { fetchUser } from 'redux/sagas/app.saga'
import { fetchArticleData, publishArticle, withDrawArticle, createArticle } from 'redux/sagas/hexo.saga'
import { PUBLISH_ARTICLE_REQUEST, WITHDRAW_ARTICLE, CREATE_ARTICLE } from 'redux/types/hexo.type'

export default function* mySaga() {
  yield takeLatest('USER_FETCH_REQUESTED', fetchUser)
  yield takeLatest('FETCH_REQUESTED', fetchArticleData)
  yield takeLatest(PUBLISH_ARTICLE_REQUEST, publishArticle)
  yield takeLatest(WITHDRAW_ARTICLE, withDrawArticle)
  yield takeLatest(CREATE_ARTICLE, createArticle)
}

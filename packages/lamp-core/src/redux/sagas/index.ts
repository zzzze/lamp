import { takeLatest } from 'redux-saga/effects'
import { switchTabbar, setProjectRoot } from 'redux/sagas/app.saga'
import { fetchArticleData, publishArticle, withDrawArticle, createArticle, updateArticle } from 'redux/sagas/hexo.saga'
import {
  FETCH_ARTICLE_SAGA,
  PUBLISH_ARTICLE_REQUEST,
  WITHDRAW_ARTICLE,
  CREATE_ARTICLE,
  UPDATE_ARTICLE,
} from 'redux/types/hexo.type'
import { SWITCH_ACTIVE_TABBAR_REQUEST, SET_PROJECT_ROOT_REQUEST } from 'redux/types/app.type'

export default function* mySaga() {
  yield takeLatest(FETCH_ARTICLE_SAGA, fetchArticleData)
  yield takeLatest(SWITCH_ACTIVE_TABBAR_REQUEST, switchTabbar)
  yield takeLatest(PUBLISH_ARTICLE_REQUEST, publishArticle)
  yield takeLatest(WITHDRAW_ARTICLE, withDrawArticle)
  yield takeLatest(CREATE_ARTICLE, createArticle)
  yield takeLatest(UPDATE_ARTICLE, updateArticle)
  yield takeLatest(SET_PROJECT_ROOT_REQUEST, setProjectRoot)
}

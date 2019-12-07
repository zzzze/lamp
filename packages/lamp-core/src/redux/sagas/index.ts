import { takeLatest } from 'redux-saga/effects'
import { switchTabbar, setProjectRoot } from 'redux/sagas/app.saga'
import {
  fetchArticleData,
  publishArticle,
  withDrawArticle,
  createArticle,
  updateArticle,
  deleteArticle,
} from 'redux/sagas/hexo.saga'
import {
  FETCH_ARTICLE_SAGA,
  PUBLISH_ARTICLE_SAGA,
  WITHDRAW_ARTICLE_SAGA,
  CREATE_ARTICLE_SAGA,
  UPDATE_ARTICLE_SAGA,
  DELETE_ARTICLE_SAGA,
} from 'redux/types/hexo.type'
import { SWITCH_ACTIVE_TABBAR_REQUEST, SET_PROJECT_ROOT_REQUEST } from 'redux/types/app.type'

export default function* mySaga() {
  yield takeLatest(FETCH_ARTICLE_SAGA, fetchArticleData)
  yield takeLatest(SWITCH_ACTIVE_TABBAR_REQUEST, switchTabbar)
  yield takeLatest(PUBLISH_ARTICLE_SAGA, publishArticle)
  yield takeLatest(WITHDRAW_ARTICLE_SAGA, withDrawArticle)
  yield takeLatest(CREATE_ARTICLE_SAGA, createArticle)
  yield takeLatest(UPDATE_ARTICLE_SAGA, updateArticle)
  yield takeLatest(DELETE_ARTICLE_SAGA, deleteArticle)
  yield takeLatest(SET_PROJECT_ROOT_REQUEST, setProjectRoot)
}

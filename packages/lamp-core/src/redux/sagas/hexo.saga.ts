import { put, select } from 'redux-saga/effects'
import { FETCH_ARTICLE_DATA, FETCHING_ARTICLE } from 'redux/types/hexo.type'
import { SWITCH_ACTIVE_TABBAR_KEY } from 'redux/types/app.type'
import { ARTICLE_TYPE } from 'utils/constants'
import {
  hexoInit,
  getArticleData,
  publishArticle as hexoPublishArticle,
  withGetArticleData,
  withdrawArticle as hexoWithdrawArticle,
  createArticle as hexoCreateArticle,
  updateArticle as hexoUpdateArticle,
} from 'hexoApi'

let hexo = null

interface FetchArticleDataActionType {
  type: string
  payload: {
    refresh: boolean
  }
}

export function* fetchArticleData(action: FetchArticleDataActionType) {
  yield put({ type: FETCHING_ARTICLE, payload: true })
  if (!hexo || (action.payload && action.payload.refresh)) {
    const projectRoot = yield select(state => state.app.projectRoot)
    hexo = yield hexoInit(projectRoot)
  }
  const articleData = yield getArticleData(hexo as any)
  yield put({ type: FETCH_ARTICLE_DATA, payload: articleData })
}

export function* publishArticle(action: any) {
  yield put({ type: FETCHING_ARTICLE, payload: true })
  if (!hexo) {
    hexo = yield hexoInit('/Users/zero/projects/blog/')
  }
  const articleData = yield withGetArticleData(hexoPublishArticle)(hexo as any, action.payload)
  yield put({ type: FETCH_ARTICLE_DATA, payload: articleData })
}

export function* withDrawArticle(action: any) {
  yield put({ type: FETCHING_ARTICLE, payload: true })
  if (!hexo) {
    hexo = yield hexoInit('/Users/zero/projects/blog/')
  }
  const articleData = yield withGetArticleData(hexoWithdrawArticle)(hexo as any, action.payload)
  yield put({ type: FETCH_ARTICLE_DATA, payload: articleData })
}

export function* createArticle(action: any) {
  yield put({ type: FETCHING_ARTICLE, payload: true })
  if (!hexo) {
    hexo = yield hexoInit('/Users/zero/projects/blog/')
  }
  const articleData = yield withGetArticleData(hexoCreateArticle)(hexo as any, action.payload)
  yield put({ type: FETCH_ARTICLE_DATA, payload: articleData })
  yield put({ type: SWITCH_ACTIVE_TABBAR_KEY, payload: ARTICLE_TYPE.DRAFT })
}

export function* updateArticle(action: any) {
  yield put({ type: FETCHING_ARTICLE, payload: true })
  if (!hexo) {
    hexo = yield hexoInit('/Users/zero/projects/blog/')
  }
  const articleData = yield withGetArticleData(hexoUpdateArticle)(hexo as any, action.payload)
  yield put({ type: FETCH_ARTICLE_DATA, payload: articleData })
}

import { put, select, delay } from 'redux-saga/effects'
import { FETCH_ARTICLE_DATA, FETCHING_ARTICLE } from 'redux/types/hexo.type'
import { SWITCH_ACTIVE_TABBAR_KEY, TOGGLE_SNACKBAR } from 'redux/types/app.type'
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

function* hexoInitTask() {
  if (!hexo) {
    const projectRoot = yield select(state => state.app.projectRoot)
    hexo = yield hexoInit(projectRoot)
  }
}

function* getArticleDataTask(action?: () => void) {
  yield put({ type: FETCHING_ARTICLE, payload: true })
  yield hexoInitTask()
  const articleData = !action ? yield getArticleData(hexo as any) : yield action()
  yield put({ type: FETCH_ARTICLE_DATA, payload: articleData })
  yield put({ type: FETCHING_ARTICLE, payload: false })
}

export function* fetchArticleData(action: FetchArticleDataActionType) {
  if (action.payload && action.payload.refresh) {
    hexo = null
  }
  yield getArticleDataTask()
}

export function* publishArticle(action: any) {
  yield getArticleDataTask(function*() {
    return yield withGetArticleData(hexoPublishArticle)(hexo as any, action.payload)
  })
}

export function* withDrawArticle(action: any) {
  yield getArticleDataTask(function*() {
    return yield withGetArticleData(hexoWithdrawArticle)(hexo as any, action.payload)
  })
}

export function* createArticle(action: any) {
  yield getArticleDataTask(function*() {
    return yield withGetArticleData(hexoCreateArticle)(hexo as any, action.payload)
  })
  yield put({ type: SWITCH_ACTIVE_TABBAR_KEY, payload: ARTICLE_TYPE.DRAFT })
}

export function* updateArticle(action: any) {
  yield put({ type: TOGGLE_SNACKBAR, payload: { open: true, message: '正在更新文章' } })
  yield getArticleDataTask(function*() {
    return yield withGetArticleData(hexoUpdateArticle)(hexo as any, action.payload)
  })
  yield put({ type: TOGGLE_SNACKBAR, payload: { open: true, message: '文章更新成功' } })
  yield delay(1000)
  yield put({ type: TOGGLE_SNACKBAR, payload: { open: false, message: '' } })
}

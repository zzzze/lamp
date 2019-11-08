import { put } from 'redux-saga/effects'
import { FETCH_ARTICLE_DATA } from 'redux/types/hexo.type'
import {
  hexoInit,
  getArticleData,
  publishArticle as hexoPublishArticle,
  withGetArticleData,
  withdrawArticle as hexoWithdrawArticle,
} from 'hexoApi'

let hexo = null

export function* fetchArticleData(action: any) {
  if (!hexo) {
    hexo = yield hexoInit('/Users/zero/projects/blog/')
  }
  const articleData = yield getArticleData(hexo as any)
  yield put({ type: FETCH_ARTICLE_DATA, payload: articleData })
}

export function* publishArticle(action: any) {
  if (!hexo) {
    hexo = yield hexoInit('/Users/zero/projects/blog/')
  }
  const articleData = yield withGetArticleData(hexoPublishArticle)(
    hexo as any,
    action.payload
  )
  yield put({ type: FETCH_ARTICLE_DATA, payload: articleData })
}

export function* withDrawArticle(action: any) {
  if (!hexo) {
    hexo = yield hexoInit('/Users/zero/projects/blog/')
  }
  const articleData = yield withGetArticleData(hexoWithdrawArticle)(
    hexo as any,
    action.payload
  )
  yield put({ type: FETCH_ARTICLE_DATA, payload: articleData })
}

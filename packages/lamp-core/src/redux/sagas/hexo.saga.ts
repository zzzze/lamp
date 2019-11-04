import { put } from 'redux-saga/effects'
import { FETCH_ARTICLE_DATA } from 'redux/types/hexo.type'
import { hexoInit, getArticleData } from 'hexoApi'

export function* fetchArticleData(action: any) {
  const hexo = yield hexoInit('/Users/zero/projects/blog/')
  const articleData = yield getArticleData(hexo)
  yield put({ type: FETCH_ARTICLE_DATA, payload: articleData })
}

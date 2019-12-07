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
  deleteArticle as hexoDeleteArticle,
  moveArticle as hexoMoveArticle,
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

function withGetArticleDataFramework(operation?: (hexo: any, ...args: any) => void) {
  return function*(...args: any[]) {
    yield put({ type: FETCHING_ARTICLE, payload: true })
    yield hexoInitTask()
    const articleData = !operation ? yield getArticleData(hexo as any) : yield operation(hexo, ...args)
    yield put({ type: FETCH_ARTICLE_DATA, payload: articleData })
    yield put({ type: FETCHING_ARTICLE, payload: false })
  }
}

function withPrompt(action: any, prompt: { before: string; after: string }, delayCount: number = 1000) {
  return function*(...args: any[]) {
    yield put({ type: TOGGLE_SNACKBAR, payload: { open: true, message: prompt.before } })
    yield action(...args)
    yield put({ type: TOGGLE_SNACKBAR, payload: { open: true, message: prompt.after } })
    yield delay(delayCount)
    yield put({ type: TOGGLE_SNACKBAR, payload: { open: false, message: '' } })
  }
}

export function* fetchArticleData(action: FetchArticleDataActionType) {
  if (action.payload && action.payload.refresh) {
    hexo = null
  }
  const task = withGetArticleDataFramework()
  yield task()
}

export function* publishArticle(action: any) {
  const task = withGetArticleDataFramework(withGetArticleData(hexoPublishArticle))
  yield task(action.payload)
}

export function* withDrawArticle(action: any) {
  const task = withGetArticleDataFramework(withGetArticleData(hexoWithdrawArticle))
  yield task(action.payload)
}

export function* createArticle(action: any) {
  const task = withPrompt(withGetArticleDataFramework(withGetArticleData(hexoCreateArticle)), {
    before: '正在创建文章',
    after: '文章创建成功',
  })
  yield task(action.payload)
  yield put({ type: SWITCH_ACTIVE_TABBAR_KEY, payload: ARTICLE_TYPE.DRAFT })
}

export function* updateArticle(action: any) {
  const task = withPrompt(withGetArticleDataFramework(withGetArticleData(hexoUpdateArticle)), {
    before: '正在更新文章',
    after: '文章更新成功',
  })
  if (action.payload.slug !== action.payload.oldSlug) {
    yield hexoMoveArticle(
      hexo as any,
      action.payload.full_source.replace(`${action.payload.oldSlug}.md`, `${action.payload.slug}.md`),
      action.payload.full_source
    )
  }
  delete action.payload.oldSlug
  yield task(action.payload)
}

export function* deleteArticle(action: any) {
  const task = withPrompt(withGetArticleDataFramework(withGetArticleData(hexoDeleteArticle)), {
    before: '正在删除文章',
    after: '文章删除成功',
  })
  yield task(action.payload)
}

import { Store } from 'redux'
import {
  FETCH_ARTICLE_SAGA,
  PUBLISH_ARTICLE_SAGA,
  WITHDRAW_ARTICLE_SAGA,
  CREATE_ARTICLE_SAGA,
  UPDATE_ARTICLE_SAGA,
  DELETE_ARTICLE_SAGA,
} from 'redux/types/hexo.type'
import store from 'redux/store'

class HexoService {
  private _store: Store

  constructor(_store: Store) {
    this._store = store
  }

  get dispatch() {
    return this._store.dispatch
  }

  public fetchArticle(payload?: any) {
    this.dispatch({ type: FETCH_ARTICLE_SAGA, payload })
  }

  public publishArticle(articleFullSouce: string) {
    this.dispatch({ type: PUBLISH_ARTICLE_SAGA, payload: articleFullSouce })
  }

  public withdrawArticle(articleFullSouce: string) {
    this.dispatch({ type: WITHDRAW_ARTICLE_SAGA, payload: articleFullSouce })
  }

  public createArticle(data: any) {
    this.dispatch({ type: CREATE_ARTICLE_SAGA, payload: data })
  }

  public updateArticle(data: any) {
    this.dispatch({ type: UPDATE_ARTICLE_SAGA, payload: data })
  }

  public deleteArticle(articleFullSouce: string) {
    this.dispatch({ type: DELETE_ARTICLE_SAGA, payload: articleFullSouce })
  }
}

export default new HexoService(store)

import { Store } from 'redux'
import { FETCH_ARTICLE_SAGA } from 'redux/types/hexo.type'
import store from 'redux/store'

class HexoService {
  private _store: Store

  constructor(_store: Store) {
    this._store = store
  }

  get dispatch() {
    return this._store.dispatch
  }

  public dispatchFetchArticleSage(payload?: any) {
    this.dispatch({ type: FETCH_ARTICLE_SAGA, payload })
  }
}

export default new HexoService(store)

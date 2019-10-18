import { Store } from 'redux'
import { ADD_TOOLBAR_BUTTON_GENERATOR } from '../redux/types/app.type'

export default class AppService {
  private _store: Store
  constructor(store: Store) {
    this._store = store
  }

  addTab(tabConfig: any) {
    this._store.dispatch({ type: ADD_TOOLBAR_BUTTON_GENERATOR, payload: tabConfig })
  }
}

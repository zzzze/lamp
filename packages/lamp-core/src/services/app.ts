import { Store } from 'redux'
import { ADD_TOOLBAR_BUTTON_GENERATOR } from '../redux/types/app.type'
import { constants } from '@lamp/shared'

interface TraversalContext {
  callback: (plugin: any, index: number) => any
  providerName: constants.Provider
}

export default class AppService {
  private _store: Store
  constructor(store: Store) {
    this._store = store
  }

  addTab(tabConfig: any) {
    this._store.dispatch({ type: ADD_TOOLBAR_BUTTON_GENERATOR, payload: tabConfig })
  }

  private traversePlugins(context: TraversalContext) {
    const rootModule = (window as any).rootModule
    let i = 0
    rootModule.modules.forEach((plugin, index) => {
      if (plugin.providers && plugin.providers[context.providerName]) {
        context.callback(plugin, i++)
      }
    })
  }

  public getEditor() {
    let result = null
    const callback = (plugin) => {
      result = plugin.providers[constants.Provider.EDITOR]
    }
    this.traversePlugins({callback, providerName: constants.Provider.EDITOR})
    return result
  }
}

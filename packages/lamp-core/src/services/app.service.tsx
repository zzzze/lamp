import * as React from 'react'
import * as Hexo from 'hexo'
import { Store } from 'redux'
import { ADD_TOOLBAR_BUTTON_GENERATOR, SET_PROJECT_ROOT_REQUEST } from 'redux/types/app.type'
import { constants } from '@lamp/shared'
import { EditorProps } from '@lamp/shared/types/editor'
import store from 'redux/store'
import { hexoInit } from 'hexoApi'
import fsExtra from 'fs-extra'

interface TraversalContext {
  callback: (plugin: any, index: number) => any
  providerName: constants.Provider
}

class AppService {
  private _store: Store

  constructor(_store: Store) {
    this._store = store
  }

  addTab(tabConfig: any) {
    this._store.dispatch({
      type: ADD_TOOLBAR_BUTTON_GENERATOR,
      payload: tabConfig,
    })
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

  public getEditor(): React.ComponentType<EditorProps> {
    let result = () => <div>No editor found.</div>
    const callback = plugin => {
      result = plugin.providers[constants.Provider.EDITOR]
    }
    this.traversePlugins({ callback, providerName: constants.Provider.EDITOR })
    return result
  }

  public getMenuItemRenderers(): Array<(args: any) => React.ReactNode> {
    const result: any[] = []
    const callback = plugin => {
      result.push(plugin.providers[constants.Provider.MENU_ITEM_RENDERER])
    }
    this.traversePlugins({
      callback,
      providerName: constants.Provider.MENU_ITEM_RENDERER,
    })
    return result
  }

  public setProjectRoot(path: string) {
    this._store.dispatch({ type: SET_PROJECT_ROOT_REQUEST, payload: path })
  }

  public getState() {
    return this._store.getState()
  }

  public async hexoDeploy() {
    const projectRoot = this._store.getState().app.projectRoot
    fsExtra.removeSync(`${projectRoot}/public/`)
    const hexo: Hexo = await hexoInit(this._store.getState().app.projectRoot, {
      debug: false,
      draft: false,
    })
    await hexo.call('deploy', { _: ['g'] })
  }
}

export default new AppService(store)

import * as React from 'react'
import * as Hexo from 'hexo'
import { Store } from 'redux'
import { ADD_TOOLBAR_BUTTON_GENERATOR, SET_PROJECT_ROOT_REQUEST, SET_THEME } from 'redux/types/app.type'
import { constants } from '@lamp/shared'
import { EditorProps } from '@lamp/shared/types/editor'
import store from 'redux/store'
import { hexoInit } from 'hexoApi'
import fsExtra from 'fs-extra'
import { remote, BrowserWindow } from 'electron'

interface TraversalContext {
  callback: (plugin: any, index: number) => any
  providerName: constants.Provider
}

let previewServer = null
let previewWin: BrowserWindow | null = null

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

  public async showPreviewWindow() {
    const hexo: Hexo = await hexoInit(this._store.getState().app.projectRoot, {}, true)
    if (!previewServer) {
      previewServer = await hexo.call('server', { port: 4000 })
    }
    if (!previewWin || previewWin.isDestroyed()) {
      previewWin = new remote.BrowserWindow({ width: 800, height: 600 })
    } else {
      previewWin.show()
    }
    previewWin.loadURL('http://localhost:4000')
  }

  public async closePreviewWindow() {
    if (previewWin && !previewWin.isDestroyed()) {
      previewWin.destroy()
    }
    if (previewServer) {
      await (previewServer as any).close()
      previewServer = null
    }
  }

  public setTheme(theme: string) {
    this._store.dispatch({ type: SET_THEME, payload: theme })
  }

  public getTheme() {
    return this._store.getState().app.theme
  }
}

export default new AppService(store)

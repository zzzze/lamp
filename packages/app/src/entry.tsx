import 'rxjs'
import * as isDev from 'electron-is-dev'
import './global.scss'
import './toastr.scss'
import { getRootModule } from './app.module'
import { findPlugins, loadPlugins, PluginInfo } from './plugins'

// Always land on the start view
location.hash = ''

;(process as any).enablePromiseAPI = true

if (process.platform === 'win32' && !('HOME' in process.env)) {
  process.env.HOME = `${process.env.HOMEDRIVE}${process.env.HOMEPATH}`
}

if (isDev) {
  console.warn('Running in debug mode')
} else {
  // enableProdMode()
}

async function bootstrap (plugins: PluginInfo[], safeMode = false): Promise<any> {
  if (safeMode) {
    plugins = plugins.filter(x => x.isBuiltin)
  }
  const pluginsModules = await loadPlugins(plugins, (current, total) => {
    (document.querySelector('.progress .bar') as HTMLElement).style.width = `${100 * current / total}%` // eslint-disable-line
    if (current / total === 1) {
      setTimeout(() => {
        document.getElementsByTagName('loading')[0].className = 'hide'
      }, 1500)
    }
  })
  const rootModule = getRootModule(pluginsModules) as any
  window['rootModule'] = rootModule
  return rootModule.bootstrap({rootNode: document.getElementsByTagName('app-root')[0]})
}

findPlugins().then(async plugins => {
  console.log('Starting with plugins:', plugins)
  try {
    await bootstrap(plugins)
  } catch (error) {
    console.error('React bootstrapping error:', error)
    console.warn('Trying safe mode')
    window['safeModeReason'] = error
    try {
      await bootstrap(plugins, true)
    } catch (error) {
      console.error('Bootstrap failed:', error)
    }
  }
})

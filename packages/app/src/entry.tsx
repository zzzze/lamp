import 'rxjs'
import * as isDev from 'electron-is-dev'
import './global.scss'
import './toastr.scss'
import { getRootModule } from './app.module'
import { findPlugins, loadPlugins, PluginInfo } from './plugins'
import electronStore from '@lamp/shared/appStore'
import themeLight from '@lamp/shared/themes/theme-light'
import themeDark from '@lamp/shared/themes/theme-dark'
import { constants } from '@lamp/shared'

const { StoreKey } = constants
const getTheme = () => {
  const themeType = electronStore.get(StoreKey.THEME)
  return themeType === 'dark' ? themeDark : themeLight
}

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

async function bootstrap(plugins: PluginInfo[], safeMode = false): Promise<any> {
  ;(document.getElementsByTagName('loading').item(0) as any).style.background = getTheme().palette.background.default
  if (safeMode) {
    plugins = plugins.filter(x => x.isBuiltin)
  }
  const pluginsModules = await loadPlugins(plugins, (current, total) => {
    ;(document.querySelector('.progress .bar') as HTMLElement).style.width = `${(100 * current) / total}%` // eslint-disable-line
    if (current / total === 1) {
      setTimeout(() => {
        document.getElementsByTagName('loading')[0].className = 'hide'
      }, 1500)
    }
  })
  const rootModule = getRootModule(pluginsModules) as any
  ;(window as any).rootModule = rootModule
  return rootModule.bootstrap({
    rootNode: document.getElementsByTagName('app-root')[0],
  })
}

findPlugins().then(async plugins => {
  console.log('Starting with plugins:', plugins)
  try {
    await bootstrap(plugins)
  } catch (error) {
    console.error('React bootstrapping error:', error)
    console.warn('Trying safe mode')
    ;(window as any).safeModeReason = error
    try {
      await bootstrap(plugins, true)
    } catch (error) {
      console.error('Bootstrap failed:', error)
    }
  }
})

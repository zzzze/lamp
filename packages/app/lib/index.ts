// import './lru'
import electronStore from '@lamp/shared/appStore'
import { constants } from '@lamp/shared'
import { app, ipcMain, Menu } from 'electron'
import { parseArgs } from './cli'
import { Application } from './app'
import themeLight from '@lamp/shared/themes/theme-light'
import themeDark from '@lamp/shared/themes/theme-dark'
import * as path from 'path'
import electronDebug = require('electron-debug')

const { StoreKey } = constants
const icon = path.resolve(__dirname, '../assets/icon.icns')

const getTheme = () => {
  const themeType = electronStore.get(StoreKey.THEME)
  return themeType === 'dark' ? themeDark : themeLight
}

if (!process.env.LAMP_PLUGINS) {
  process.env.LAMP_PLUGINS = ''
}

const application = new Application()

ipcMain.on('app:new-window', () => {
  application.newWindow({
    color: getTheme().palette.background.default,
    icon,
  })
})

app.on('activate', () => {
  if (!application.hasWindows()) {
    application.newWindow({
      color: getTheme().palette.background.default,
      icon,
    })
  } else {
    application.focus()
  }
})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

process.on('uncaughtException' as any, err => {
  console.log(err)
  application.broadcast('uncaughtException', err)
})

app.on('second-instance', (_event, argv, cwd) => {
  application.send('host:second-instance', parseArgs(argv, cwd), cwd)
})

const argv = parseArgs(process.argv, process.cwd())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  app.exit(0)
}

if (argv.d) {
  electronDebug({
    isEnabled: true,
    showDevTools: true,
    devToolsMode: 'undocked',
  })
}

app.on('ready', () => {
  if (process.platform === 'darwin') {
    app.dock.setMenu(
      Menu.buildFromTemplate([
        {
          label: 'New window',
          click() {
            this.app.newWindow({
              color: getTheme().palette.background.default,
              icon,
            })
          },
        },
      ])
    )
  }
  application.init()
  application.newWindow({
    hidden: argv.hidden,
    color: getTheme().palette.background.default,
    icon,
  })
})

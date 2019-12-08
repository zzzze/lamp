import * as React from 'react'
import * as ReactDOM from 'react-dom'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import SettingsIcon from '@material-ui/icons/Settings'
import Typography from '@material-ui/core/Typography'
import { constants } from '@lamp/shared'
import SettingPage from 'components/Settings'
import { ThemeProvider } from '@material-ui/core/styles'
import electron from 'electron'

const settingElement = document.createElement('div')
settingElement.id = 'setting-page'

const renderSettingPage = appService => {
  settingElement.style.display = 'block'
  return ReactDOM.render(
    <ThemeProvider theme={appService.getTheme()}>
      <SettingPage appService={appService} onClose={handleClose} />
    </ThemeProvider>,
    settingElement
  )
}

const handleClose = () => {
  settingElement.style.display = 'none'
}

const providers = {
  [constants.Provider.MENU_ITEM_RENDERER]: ({ appService, classes, afterClick }) => {
    const handleRenderSettingPage = () => {
      renderSettingPage(appService)
    }
    electron.ipcRenderer.on('host:preferences-menu', () => handleRenderSettingPage())

    return (
      <MenuItem
        key="settings"
        onClick={() => {
          handleRenderSettingPage()
          afterClick && afterClick()
        }}
      >
        <ListItemIcon className={classes.menuItemIcon}>
          <SettingsIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="inherit">设置</Typography>
      </MenuItem>
    )
  },
}

export { providers }

export function bootstrap() {
  document.body.append(settingElement)
}

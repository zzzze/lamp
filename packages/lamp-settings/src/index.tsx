import * as React from 'react'
import * as ReactDOM from 'react-dom'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import SettingsIcon from '@material-ui/icons/Settings'
import Typography from '@material-ui/core/Typography'
import { constants } from '@lamp/shared'

const settingElement = document.createElement('div')
settingElement.id = 'setting-page'

const SettingPage = ({ appService }) => {
  const handleClick = () => {
    appService.setProjectRoot('xxx')
  }
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 3000,
        background: '#fff',
      }}
      onClick={handleClick}
    >
      setting page
    </div>
  )
}

const renderSettingPage = appService => {
  return ReactDOM.render(<SettingPage appService={appService} />, settingElement)
}

const providers = {
  [constants.Provider.MENU_ITEM_RENDERER]: ({ appService, classes }) => {
    return (
      <MenuItem key="settings" onClick={() => renderSettingPage(appService)}>
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

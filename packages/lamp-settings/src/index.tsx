import * as React from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import SettingsIcon from '@material-ui/icons/Settings'
import Typography from '@material-ui/core/Typography'
import { constants } from '@lamp/shared'

const providers = {
  [constants.Provider.MENU_ITEM_RENDERER]: ({ classes }) => {
    return (
      <MenuItem>
        <ListItemIcon className={classes.menuItemIcon}>
          <SettingsIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="inherit">Settings</Typography>
      </MenuItem>
    )
  },
}
export { providers }

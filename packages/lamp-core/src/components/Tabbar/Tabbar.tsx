import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import appService from 'services/app.service'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tabBar: {
      height: theme.spacing(5),
      '-webkit-app-region': 'drag',
    },
    tabs: {
      flex: 1,
    },
    menu: {},
    menuIcon: {
      padding: `${theme.spacing(1)}px 12px`,
    },
    menuItemIcon: {
      minWidth: 30,
    },
  })
)

const Tabbar: React.FC = () => {
  const classes = useStyles()
  const tabs = useSelector((state: any) => state.app.tabs)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const menuButtonRenderers = appService.getMenuItemRenderers()
  console.log(menuButtonRenderers)

  return (
    <Grid container item className={classes.tabBar}>
      <Grid item className={classes.tabs}>
        {tabs.map((tab: any) => (
          <div key={tab.name}>{tab.name}</div>
        ))}
      </Grid>
      <Grid item className={classes.menu}>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          className={classes.menuIcon}
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              width: 200,
            },
          }}
        >
          {menuButtonRenderers.map(render => render({ classes }))}
        </Menu>
      </Grid>
    </Grid>
  )
}

export default Tabbar

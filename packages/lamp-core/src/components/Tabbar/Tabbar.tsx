import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import PublishIcon from '@material-ui/icons/Publish'
import Typography from '@material-ui/core/Typography'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import Snackbar from '@material-ui/core/Snackbar'
import Switch from '@material-ui/core/Switch'
import ServiceContext from 'services/service.context'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tabBar: {
      height: theme.spacing(5),
      '-webkit-app-region': 'drag',
      borderBottomColor: theme.palette.divider,
      borderBottomStyle: 'solid',
      borderBottomWidth: 1,
    },
    tabs: {
      flex: 1,
    },
    menu: {},
    menuIcon: {
      padding: theme.spacing(1),
    },
    menuItemIcon: {
      minWidth: 30,
    },
  })
)

let isDeploying = false

const Tabbar: React.FC = () => {
  const classes = useStyles()
  const tabs = useSelector((state: any) => state.app.tabs)
  const theme = useSelector((state: any) => state.app.theme)
  const service = React.useContext(ServiceContext)
  const [state, setState] = React.useState({
    open: false,
    message: 'test',
  })
  const [isPreviewServerOn, setIsPreviewServerOn] = React.useState(false)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const hidePopupMenu = () => {
    setAnchorEl(null)
  }

  const handleDeploy = async function() {
    if (isDeploying) return
    isDeploying = true
    setState({
      open: true,
      message: '部署中...',
    })
    hidePopupMenu()
    await service.appService.hexoDeploy()
    setState({
      open: true,
      message: '部署成功！',
    })
    setTimeout(
      () =>
        setState({
          open: false,
          message: '',
        }),
      1000
    )
    isDeploying = false
  }

  const handleStopPreview = async function() {
    hidePopupMenu()
    await service.appService.closePreviewWindow()
    setIsPreviewServerOn(false)
  }

  const handlePreview = async function() {
    hidePopupMenu()
    await service.appService.showPreviewWindow()
    setIsPreviewServerOn(true)
  }

  const menuButtonRenderers = service.appService.getMenuItemRenderers()
  const handleChangeTheme = () => {
    service.appService.setTheme(theme === 'dark' ? 'light' : 'dark')
  }

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
          onClose={hidePopupMenu}
          PaperProps={{
            style: {
              width: 200,
            },
          }}
        >
          <MenuItem>
            <Typography variant="inherit">黑暗模式</Typography>
            <Switch
              checked={theme === 'dark'}
              onChange={handleChangeTheme}
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </MenuItem>
          <MenuItem onClick={handleDeploy}>
            <ListItemIcon className={classes.menuItemIcon}>
              <PublishIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">部署</Typography>
          </MenuItem>
          {isPreviewServerOn ? (
            <MenuItem onClick={handleStopPreview}>
              <ListItemIcon className={classes.menuItemIcon}>
                <VisibilityOffIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">停止本地预览</Typography>
            </MenuItem>
          ) : (
            <MenuItem onClick={handlePreview}>
              <ListItemIcon className={classes.menuItemIcon}>
                <VisibilityIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="inherit">本地预览</Typography>
            </MenuItem>
          )}
          {menuButtonRenderers.map(render =>
            render({ classes, appService: service.appService, afterClick: hidePopupMenu })
          )}
        </Menu>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={state.open}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={state.message}
        />
      </Grid>
    </Grid>
  )
}

export default Tabbar

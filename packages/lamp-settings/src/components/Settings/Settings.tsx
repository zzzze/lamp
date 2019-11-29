import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import Sidebar from 'components/Sidebar'
import Button from '@material-ui/core/Button'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { remote } from 'electron'
import TextField from '@material-ui/core/TextField'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 3000,
      backgroundColor: theme.palette.background.default,
    },
    titleBar: {
      height: 44,
      lineHeight: '43px',
      textAlign: 'center',
      color: theme.palette.text.primary,
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(12),
      borderBottomColor: theme.palette.divider,
      borderBottomStyle: 'solid',
      borderBottomWidth: 1,
    },
    container: {
      padding: theme.spacing(0),
      height: '100vh',
    },
    mainContainer: {
      flex: 1,
      width: '100%',
      overflow: 'hidden',
    },
    content: {
      flex: 1,
      padding: 20,
      paddingTop: 10,
      paddingBottom: 10,
    },
  })
)

const SettingPage = ({ appService, onClose }) => {
  const classes = useStyles()
  const [projectRoot, setProjectRoot] = React.useState(appService.getState().app.projectRoot)
  const handleProjectRootChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectRoot(event.target.value)
  }, [])

  const handleSelectProject = React.useCallback(() => {
    remote.dialog.showOpenDialog(
      {
        properties: ['openDirectory'],
        title: '选择项目路径',
      },
      (filepath: string[] = []) => {
        if (filepath.length) {
          setProjectRoot(filepath.pop() || '')
        }
      }
    )
  }, [])
  const handleSave = React.useCallback(() => {
    appService.setProjectRoot(projectRoot)
    ;(window as any).reloadApp()
    // onClose()
  }, [projectRoot])
  return (
    <div className={classes.root}>
      <Grid container direction="column" spacing={0} className={classes.container}>
        <Grid item className={classes.titleBar}>
          <div>设置</div>
          <div style={{ position: 'absolute', top: 0, right: 0 }}>
            <IconButton onClick={handleSave}>
              <SaveIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={onClose}>
              <CancelIcon fontSize="small" />
            </IconButton>
          </div>
        </Grid>
        <Grid item container justify="center" spacing={0} className={classes.mainContainer}>
          <Sidebar />
          <Grid item className={classes.content}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                required
                autoFocus
                margin="dense"
                id="title"
                value={projectRoot}
                label="项目路径"
                type="text"
                onChange={handleProjectRootChange}
                variant="outlined"
                style={{ flex: 1 }}
              />
              <Button color="primary" variant="contained" style={{ marginLeft: 10 }} onClick={handleSelectProject}>
                选择项目
              </Button>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default SettingPage

import * as React from 'react'
import AppService from '../services/app'
import store from '../redux/store'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Tabbar from './Tabbar'

const appService = new AppService(store)

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(0),
      height: '100vh',
    },
    mainContainer: {
      flex: 1,
      width: '100%',
    },
    content: {
      flex: 1,
    },
    sidebar: {
      width: 200,
    },
  })
)

const AppRoot: React.FC = () => {
  const classes = useStyles()
  const renderEditor: any = appService.getEditor()
  return (
    <div>
      <Grid
        container
        direction="column"
        spacing={0}
        className={classes.container}
      >
        <Tabbar />

        <Grid
          item
          container
          justify="center"
          spacing={0}
          className={classes.mainContainer}
        >
          <Grid item className={classes.sidebar}>
            <Button variant="contained">Default</Button>
            <div className="editor-wrapper">编辑器</div>
          </Grid>
          <Grid item className={classes.content}>
            {renderEditor()}
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
export default AppRoot

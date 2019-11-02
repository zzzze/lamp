import * as React from 'react'
import appService from 'services/app.service'
import Grid from '@material-ui/core/Grid'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Tabbar from 'components/Tabbar'
import Sidebar from 'components/Sidebar'

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
  })
)

const AppRoot: React.FC = () => {
  const classes = useStyles()
  const Editor = appService.getEditor()
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
          <Sidebar />
          <Grid item className={classes.content}>
            <Editor />
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
export default AppRoot

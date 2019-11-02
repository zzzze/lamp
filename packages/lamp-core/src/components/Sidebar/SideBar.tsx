import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import PostList from 'components/PostList'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sidebar: {
      width: 200,
    },
    content: {
      flex: 1,
    },
    nav: {},
  })
)

const Sidebar: React.FC = () => {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const handleNavChange = (event, newValue) => setValue(newValue)

  return (
    <Grid container direction="column" item className={classes.sidebar}>
      <Grid item className={classes.content}>
        <PostList />
      </Grid>
      <Grid item className={classes.nav}>
        <BottomNavigation value={value} onChange={handleNavChange} showLabels>
          <BottomNavigationAction label="文章" icon={<BookmarkIcon />} />
          <BottomNavigationAction label="草稿" icon={<BookmarkBorderIcon />} />
        </BottomNavigation>
      </Grid>
    </Grid>
  )
}

export default Sidebar

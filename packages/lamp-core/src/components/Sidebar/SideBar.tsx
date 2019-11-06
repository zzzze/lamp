import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import PostList from 'components/PostList'
import { useSelector, useDispatch } from 'react-redux'

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    sidebar: {
      width: 200,
      height: '100%',
    },
    content: {
      flex: 1,
      overflowY: 'scroll',
    },
    nav: {},
  })
)

const Sidebar: React.FC = () => {
  const [value, setValue] = React.useState(0)
  const classes = useStyles()
  const dispatch = useDispatch()
  const state = useSelector((state: any) => ({
    posts: state.hexo.posts,
    drafts: state.hexo.drafts,
    data: state.hexo.data,
  }))
  const handleNavChange = (_event: any, newValue: number) => {
    return setValue(newValue)
  }
  React.useEffect(() => {
    dispatch({ type: 'FETCH_REQUESTED' })
  }, [])

  const articleData = {
    postIds: value === 0 ? state.posts : state.drafts,
    data: state.data,
  }

  return (
    <Grid container direction="column" item className={classes.sidebar}>
      <Grid item className={classes.content}>
        <PostList articleData={articleData} />
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

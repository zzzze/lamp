import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import LinearProgress from '@material-ui/core/LinearProgress'
import PostList from 'components/PostList'
import { useSelector, useDispatch } from 'react-redux'
import { IArticle } from 'hexoApi/types'
import { ARTICLE_TYPE } from 'utils/constants'
import SidebarActionButtons from 'components/SidebarActionButtons'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sidebar: {
      width: 200,
      height: '100%',
      borderRightColor: theme.palette.divider,
      borderRightStyle: 'solid',
      borderRightWidth: 1,
      overflow: 'hidden',
    },
    content: {
      flex: 1,
      overflowY: 'scroll',
    },
    nav: {
      borderTopColor: theme.palette.divider,
      borderTopStyle: 'solid',
      borderTopWidth: 1,
    },
    progress: {
      height: 2,
    },
  })
)

interface SidebarProps {
  selectedId: string | null
  onSelectPost: (article: IArticle) => void
  selectedPostType: ARTICLE_TYPE
  onSelectedPostTypeChange: (type: ARTICLE_TYPE) => void
}

const Sidebar: React.FC<SidebarProps> = ({ selectedId, onSelectPost, selectedPostType, onSelectedPostTypeChange }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [loading, setLoading] = React.useState(true)
  const state = useSelector((state: any) => ({
    posts: state.hexo.posts,
    drafts: state.hexo.drafts,
    data: state.hexo.data,
  }))
  React.useEffect(() => {
    if (state.posts.length || state.drafts.length) {
      setLoading(false)
    }
  }, [state])
  const handleNavChange = (_event: any, newValue: ARTICLE_TYPE) => {
    return onSelectedPostTypeChange(newValue)
  }
  React.useEffect(() => {
    dispatch({ type: 'FETCH_REQUESTED', payload: { refresh: true } })
  }, [])

  const articleData: {
    postIds: string[]
    data: IArticle[]
  } = {
    postIds: selectedPostType === ARTICLE_TYPE.POST ? state.posts : state.drafts,
    data: state.data,
  }

  return (
    <Grid container direction="column" item className={classes.sidebar}>
      <Grid item>
        <SidebarActionButtons />
      </Grid>
      <Grid item className={classes.content}>
        <PostList
          selectedPostType={selectedPostType}
          onSelectPost={onSelectPost}
          articleData={articleData}
          selectedId={selectedId}
        />
      </Grid>
      <Grid item className={classes.nav}>
        {loading ? <LinearProgress variant="query" classes={{ root: classes.progress }} /> : null}
        <BottomNavigation value={selectedPostType} onChange={handleNavChange} showLabels>
          <BottomNavigationAction label="文章" value={ARTICLE_TYPE.POST} icon={<BookmarkIcon />} />
          <BottomNavigationAction label="草稿" value={ARTICLE_TYPE.DRAFT} icon={<BookmarkBorderIcon />} />
        </BottomNavigation>
      </Grid>
    </Grid>
  )
}

export default Sidebar

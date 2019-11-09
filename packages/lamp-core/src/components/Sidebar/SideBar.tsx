import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
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
    },
    content: {
      flex: 1,
      overflowY: 'scroll',
    },
    actionButtons: {
      padding: theme.spacing(1),
      paddingTop: 0,
      paddingBottom: 0,
    },
    nav: {},
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
  const state = useSelector((state: any) => ({
    posts: state.hexo.posts,
    drafts: state.hexo.drafts,
    data: state.hexo.data,
  }))
  const handleNavChange = (_event: any, newValue: ARTICLE_TYPE) => {
    return onSelectedPostTypeChange(newValue)
  }
  React.useEffect(() => {
    dispatch({ type: 'FETCH_REQUESTED' })
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
      <Grid item className={classes.actionButtons}>
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
        <BottomNavigation value={selectedPostType} onChange={handleNavChange} showLabels>
          <BottomNavigationAction label="文章" value={ARTICLE_TYPE.POST} icon={<BookmarkIcon />} />
          <BottomNavigationAction label="草稿" value={ARTICLE_TYPE.DRAFT} icon={<BookmarkBorderIcon />} />
        </BottomNavigation>
      </Grid>
    </Grid>
  )
}

export default Sidebar
